export default {
    data() {
        return {
            isSidebarEntire: true,
            isSidebarCollapsed: true,
        }
    },
	methods: {
		subIsActive(input) {
            const paths = Array.isArray(input) ? input : [input];

            return paths.some(path => {
                return this.$route.path.indexOf(path) === 0;
            });
        },
        toggleSidebarWidth() {
            this.isSidebarEntire = !this.isSidebarEntire;
        },
        toggleSidebarVisibility() {
            this.isSidebarCollapsed = !this.isSidebarCollapsed;
        },
        scrollToError() {
            var $outer = $('#frame-scrollable')
            var $errors = $outer.find('.errors, .error');
            if ($errors.length > 0) {
                $outer.animate({
                    scrollTop: $outer.scrollTop() - $outer.offset().top + $errors.filter(":first").offset().top - 15
                });
            }
        }
	}
}