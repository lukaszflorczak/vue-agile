const args = require('minimist')(process.argv.slice(2))
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const semver = require('semver')
const currentVersion = require('../package.json').version
const { prompt } = require('enquirer')
const execa = require('execa')
const step = msg => console.log(chalk.cyan(msg))

const preId =
  args.preid ||
  (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0])
const isDryRun = args.dry
const skipTests = args.skipTests

const versionIncrements = [
  'patch',
  'minor',
  'major',
  ...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] : []),
]

const inc = i => semver.inc(currentVersion, i, preId)
const bin = name => path.resolve(__dirname, '../node_modules/.bin/' + name)
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })
const dryRun = (bin, args, opts = {}) =>
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts)
const runIfNotDry = isDryRun ? dryRun : run

async function main() {
  let targetVersion = args._[0]

  if (!targetVersion) {
    // no explicit version, offer suggestions
    const { release } = await prompt({
      type: 'select',
      name: 'release',
      message: 'Select release type',
      choices: versionIncrements
        .map(i => `${i} (${inc(i)})`)
        .concat(['custom']),
    })

    if (release === 'custom') {
      targetVersion = (
        await prompt({
          type: 'input',
          name: 'version',
          message: 'Input custom version',
          initial: currentVersion,
        })
      ).version
    } else {
      targetVersion = release.match(/\((.*)\)/)[1]
    }
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`)
  }

  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`,
  })

  if (!yes) {
    return
  }

  // Run test
  step('\nRunning tests...')
  if (!skipTests && !isDryRun) {
    await run(bin('jest'), ['--clearCache'])
    await run('yarn', ['test', '--bail'])
  } else {
    console.log(`(skipped)`)
  }

  // Update package
  step('\nUpdate package')
  if (!isDryRun) {
    await updatePackage(targetVersion)
  } else {
    console.log(`(skipped)`)
  }

  step('\nBuilding package...')
  if (!isDryRun) {
    await run('yarn', ['build'])
    await run('yarn', ['build:dts'])
  } else {
    console.log(`(skipped)`)
  }

  // Generate changelog
  if (!isDryRun) {
    await run(`yarn`, ['changelog'])
  }

  const { stdout } = await run('git', ['diff'], { stdio: 'pipe' })
  if (stdout) {
    step('\nCommitting changes...')
    await runIfNotDry('git', ['add', '-A'])
    await runIfNotDry('git', ['commit', '-m', `release: v${targetVersion}`])
  } else {
    console.log('No changes to commit.')
  }

  // Publish packages
  await publishPackage(targetVersion, runIfNotDry)

  // Push to GitHub
  step('\nPushing to GitHub...')
  await runIfNotDry('git', ['tag', `v${targetVersion}`])
  await runIfNotDry('git', ['push', 'origin', `refs/tags/v${targetVersion}`])
  await runIfNotDry('git', ['push'])

  if (isDryRun) {
    console.log(`\nDry run finished - run git diff to see package changes.`)
  }
  console.log()
}

/**
 * Public package to npm
 * @param version
 * @param runIfNotDry
 * @returns {Promise<void>}
 */
async function publishPackage(version, runIfNotDry) {
  const root = path.resolve(__dirname, '..')
  const pkgPath = path.resolve(root, 'package.json')
  const pkg = require(pkgPath)
  const pkgName = pkg.name
  if (pkg.private) {
    return
  }

  const prerelease = semver.prerelease(version)
  const releaseTag = prerelease ? prerelease[0] : null

  step(`Publishing ${pkgName}...`)
  try {
    await runIfNotDry(
      'yarn',
      [
        'publish',
        '--new-version',
        version,
        ...(releaseTag ? ['--tag', releaseTag] : []),
        '--access',
        'public',
      ],
      {
        cwd: root,
        stdio: 'pipe',
      }
    )
    console.log(chalk.green(`Successfully published ${pkgName}@${version}`))
  } catch (e) {
    if (e.stderr.match(/previously published/)) {
      console.log(chalk.red(`Skipping already published: ${pkgName}`))
    } else {
      throw e
    }
  }
}

/**
 * Update package version
 * @param version
 * @returns {Promise<void>}
 */
async function updatePackage(version) {
  const root = path.resolve(__dirname, '..')
  const pkgPath = path.resolve(root, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.version = version
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

main().catch(e => {
  console.error(e)
})
