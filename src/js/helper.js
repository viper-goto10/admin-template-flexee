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
            const outer = document.getElementById('frame-scrollable');
            if (!outer) return;
            const firstError = outer.querySelector('.errors, .error');
            if (firstError) {
                outer.scrollTop += firstError.getBoundingClientRect().top - outer.getBoundingClientRect().top - 15;
            }
        }
	}
}