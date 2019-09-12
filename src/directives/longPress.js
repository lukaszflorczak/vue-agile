export const longPress = {
    bind: function (el, binding, vNode) {
        // Make sure expression provided is a function
        if (typeof binding.value !== 'function') {
            // Fetch name of component
            const compName = vNode.context.name
            // pass warning to console
            let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be`
            if (compName) { warn += `Found in component '${compName}' ` }

            console.warn(warn)
        }

        let speed = (isNaN(binding.arg) ? 1000 : binding.arg)

        // Define variable
        let pressTimer = null

        // Define funtion handlers
        // Create timeout ( run function after 1s )
        let start = (e) => {
            if (e.type === 'click' && e.button !== 0) {
                return
            }

            if (pressTimer === null) {
                pressTimer = setInterval(() => {
                    if (el.disabled) {
                        clearTimeout(pressTimer)
                        pressTimer = null
                        return
                    }
                    // Run function
                    handler()
                }, speed)
            }
        }

        // Cancel Timeout
        let cancel = (e) => {
            // Check if timer has a value or not
            if (pressTimer !== null) {
                clearTimeout(pressTimer)
                pressTimer = null
            }
        }
        // Run Function
        const handler = (e) => {
            binding.value(e)
        }

        // Add Event listeners
        el.addEventListener('mousedown', start)
        el.addEventListener('touchstart', start)
        // Cancel timeouts if this events happen
        el.addEventListener('click', cancel)
        el.addEventListener('mouseout', cancel)
        el.addEventListener('touchend', cancel)
        el.addEventListener('touchcancel', cancel)
    }
}
