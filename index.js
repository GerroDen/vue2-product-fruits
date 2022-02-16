/**
 * Content free component to add [Product Fruits](https://docs.productfruits.com/) and change user information after login.
 * Also requires a call of `pageChanged()` when routing changed.
 */
export default {
	name: "ProductFruits",
	props: {
		projectCode: {type: String, required: true},
		language: {type: String, required: true},
		username: {type: String, required: true},
		email: String,
		firstname: String,
		lastname: String,
		signUpAt: String,
		role: String,
		/** @type {Record<string, string | number | boolean>} */
		props: Object,
	},
	mounted() {
		const {
			projectCode,
			language,
		} = this.$props;
		if (!projectCode || !language || !isDOMReady()) {
			console.info("PF - dom is not ready, projectCode is not set or language is not set");
			return;
		}
		if (!window.productFruits) {
			this.setUserConfig();
			window.pfDisableUrlChangeDetection = true;
			((w, d, u, c) => {
				const headEl = d.getElementsByTagName("head")[0];
				const scriptEl = d.createElement("script");
				scriptEl.async = 1;
				scriptEl.src = `${u}?c=${c}`;
				this.scriptElement = scriptEl;
				headEl.appendChild(scriptEl);
			})(window, document, "https://app.productfruits.com/static/script.js", projectCode, language);
		}
		if (window.productFruitsUnmounted && window.productFruitsInit) {
			window.productFruitsInit();
			delete window.productFruitsUnmounted;
		}
		console.debug(`product fruits mounted with ${JSON.stringify(this.$props)}`);
	},
	updated() {
		if (!isDOMReady()) return;
		this.setUserConfig();
		console.debug(`product fruits updated with ${JSON.stringify(this.$props)}`);
	},
	beforeDestroy() {
		if (!isDOMReady() || !window.productFruits || !window.productFruits.services) return;
		window.productFruits.services.destroy();
		delete window.productFruits;
		delete window.productFruitsUser;
		window.productFruitsUnmounted = true;
		this.scriptElement && this.scriptElement.remove();
		console.debug("product fruits unmounted");
	},
	methods: {
		setUserConfig() {
			const {
				projectCode,
				language,
				username,
				email,
				firstname,
				lastname,
				signUpAt,
				role,
				props,
			} = this.$props;
			if (!window.productFruits || !window.productFruits.identifyUser) {
				window.productFruitsUser = {
					username,
					email,
					firstname,
					lastname,
					signUpAt,
					role,
					props,
				};
			} else {
				window.productFruits.identifyUser({
					username,
					email,
					firstname,
					lastname,
					signUpAt,
					role,
					props,
				});
			}
			window.productFruits = window.productFruits || {};
			const fireLanguageChangedEvent = window.productFruits.language && window.productFruits.language !== language;
			window.productFruits.language = language;
			window.productFruits.code = projectCode;
			if (fireLanguageChangedEvent) {
				document.dispatchEvent(new CustomEvent("pf:language_changed"));
			}
		},
	},
	render(createElement) {
		return createElement(null, `product fruits ${JSON.stringify(this.$props)}`);
	},
};

/**
 * @return {boolean}
 */
function isDOMReady() {
	return window && window.document && window.document.createElement;
}

