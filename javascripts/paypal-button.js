if (typeof PAYPAL === 'undefined' || !PAYPAL) {
  var PAYPAL = {};
}

PAYPAL.apps = PAYPAL.apps || {};


(function () {

	'use strict';


	var app = {},
		paypalURL = 'https://{env}.paypal.com/cgi-bin/webscr',
		qrCodeURL = 'https://{env}.paypal.com/webapps/ppint/qrcode?data={url}&pattern={pattern}&height={size}',
		bnCode = 'JavaScriptButton_{type}',
		prettyParams = {
			name: 'item_name',
			number: 'item_number',
			locale: 'lc',
			currency: 'currency_code',
			recurrence: 'p3',
			period: 't3',
			callback: 'notify_url'
		},
		locales = {
			da_DK: { buynow: 'KÃ¸b nu', cart: 'LÃ¦g i indkÃ¸bsvogn', donate: 'Doner', subscribe: 'Abonner', item_name: 'Vare', number: 'Nummer', amount: 'Pris', quantity: 'Antal' },
			de_DE: { buynow: 'Jetzt kaufen', cart: 'In den Warenkorb', donate: 'Spenden', subscribe: 'Abonnieren', item_name: 'Artikel', number: 'Nummer', amount: 'Betrag', quantity: 'Menge' },
			en_AU: { buynow: 'Buy Now', cart: 'Add to Cart', donate: 'Donate', subscribe: 'Subscribe', item_name: 'Item', number: 'Number', amount: 'Amount', quantity: 'Quantity' },
			en_GB: { buynow: 'Buy Now', cart: 'Add to Cart', donate: 'Donate', subscribe: 'Subscribe', item_name: 'Item', number: 'Number', amount: 'Amount', quantity: 'Quantity' },
			en_US: { buynow: 'Buy Now', cart: 'Add to Cart', donate: 'Donate', subscribe: 'Subscribe', item_name: 'Item', number: 'Number', amount: 'Amount', quantity: 'Quantity' },
			es_ES: { buynow: 'Comprar ahora', cart: 'AÃ±adir al carro', donate: 'Donar', subscribe: 'Suscribirse', item_name: 'ArtÃ­culo', number: 'NÃºmero', amount: 'Importe', quantity: 'Cantidad' },
			es_XC: { buynow: 'Comprar ahora', cart: 'AÃ±adir al carrito', donate: 'Donar', subscribe: 'Suscribirse', item_name: 'ArtÃ­culo', number: 'NÃºmero', amount: 'Importe', quantity: 'Cantidad' },
			fr_CA: { buynow: 'Acheter', cart: 'Ajouter au panier', donate: 'Faire un don', subscribe: 'Souscrire', item_name: 'Objet', number: 'NumÃ©ro', amount: 'Montant', quantity: 'QuantitÃ©' },
			fr_FR: { buynow: 'Acheter', cart: 'Ajouter au panier', donate: 'Faire un don', subscribe: 'Souscrire', item_name: 'Objet', number: 'NumÃ©ro', amount: 'Montant', quantity: 'QuantitÃ©' },
			fr_XC: { buynow: 'Acheter', cart: 'Ajouter au panier', donate: 'Faire un don', subscribe: 'Souscrire', item_name: 'Objet', number: 'NumÃ©ro', amount: 'Montant', quantity: 'QuantitÃ©' },
			he_IL: { buynow: '×•×™×©×›×¢ ×”× ×§', cart: '×ª×•×™× ×§×” ×œ×¡×œ ×£×¡×•×”', donate: '××•×¨×ª', subscribe: '×™×•× ×ž×› ×£×¨×˜×¦×”', item_name: '×˜×™×¨×¤', number: '×¨×¤×¡×ž', amount: '××•×›×¡', quantity: '×ž×•×ª×›' },
			id_ID: { buynow: 'Beli Sekarang', cart: 'Tambah ke Keranjang', donate: 'Donasikan', subscribe: 'Berlangganan', item_name: 'Barang', number: 'Nomor', amount: 'Harga', quantity: 'Kuantitas' },
			it_IT: { buynow: 'Paga adesso', cart: 'Aggiungi al carrello', donate: 'Donazione', subscribe: 'Iscriviti', item_name: 'Oggetto', number: 'Numero', amount: 'Importo', quantity: 'QuantitÃ ' },
			ja_JP: { buynow: 'ä»Šã™ãè³¼å…¥', cart: 'ã‚«ãƒ¼ãƒˆã«è¿½åŠ ', donate: 'å¯„ä»˜', subscribe: 'è³¼èª­', item_name: 'å•†å“', number: 'ç•ªå·', amount: 'ä¾¡æ ¼', quantity: 'æ•°é‡' },
			nl_NL: { buynow: 'Nu kopen', cart: 'Aan winkelwagentje toevoegen', donate: 'Doneren', subscribe: 'Abonneren', item_name: 'Item', number: 'Nummer', amount: 'Bedrag', quantity: 'Hoeveelheid' },
			no_NO: { buynow: 'KjÃ¸p nÃ¥', cart: 'Legg til i kurv', donate: 'Doner', subscribe: 'Abonner', item_name: 'Vare', number: 'Nummer', amount: 'BelÃ¸p', quantity: 'Antall' },
			pl_PL: { buynow: 'Kup teraz', cart: 'Dodaj do koszyka', donate: 'PrzekaÅ¼ darowiznÄ™', subscribe: 'Subskrybuj', item_name: 'Przedmiot', number: 'Numer', amount: 'Kwota', quantity: 'IloÅ›Ä‡' },
			pt_BR: { buynow: 'Comprar agora', cart: 'Adicionar ao carrinho', donate: 'Doar', subscribe: 'Assinar', item_name: 'Produto', number: 'NÃºmero', amount: 'Valor', quantity: 'Quantidade' },
			ru_RU: { buynow: 'ÐšÑƒÐ¿Ð¸Ñ‚ÑŒ ÑÐµÐ¹Ñ‡Ð°Ñ', cart: 'Ð”Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑŒ Ð² ÐºÐ¾Ñ€Ð·Ð¸Ð½Ñƒ', donate: 'ÐŸÐ¾Ð¶ÐµÑ€Ñ‚Ð²Ð¾Ð²Ð°Ñ‚ÑŒ', subscribe: 'ÐŸÐ¾Ð´Ð¿Ð¸ÑÐ°Ñ‚ÑŒÑÑ', item_name: 'Ð¢Ð¾Ð²Ð°Ñ€', number: 'ÐÐ¾Ð¼ÐµÑ€', amount: 'Ð¡ÑƒÐ¼Ð¼Ð°', quantity: 'ÐšÐ¾Ð»Ð¸Ñ‡ÐµÑÑ‚Ð²Ð¾' },
			sv_SE: { buynow: 'KÃ¶p nu', cart: 'LÃ¤gg till i kundvagn', donate: 'Donera', subscribe: 'Abonnera', item_name: 'Objekt', number: 'Nummer', amount: 'Belopp', quantity: 'Antal' },
			th_TH: { buynow: 'à¸‹à¸·à¹‰à¸­à¸—à¸±à¸™à¸—à¸µ', cart: 'à¹€à¸žà¸´à¹ˆà¸¡à¸¥à¸‡à¸•à¸°à¸à¸£à¹‰à¸²', donate: 'à¸šà¸£à¸´à¸ˆà¸²à¸„', subscribe: 'à¸šà¸­à¸à¸£à¸±à¸šà¸ªà¸¡à¸²à¸Šà¸´à¸', item_name: 'à¸Šà¸·à¹ˆà¸­à¸ªà¸´à¸™à¸„à¹‰à¸²', number: 'à¸£à¸«à¸±à¸ªà¸ªà¸´à¸™à¸„à¹‰à¸²', amount: 'à¸£à¸²à¸„à¸²', quantity: 'à¸ˆà¸³à¸™à¸§à¸™' },
			tr_TR: { buynow: 'Hemen AlÄ±n', cart: 'Sepete Ekleyin', donate: 'BaÄŸÄ±ÅŸ YapÄ±n', subscribe: 'Abone Olun', item_name: 'ÃœrÃ¼n', number: 'Numara', amount: 'Tutar', quantity: 'Miktar' },
			zh_CN: { buynow: 'ç«‹å³è´­ä¹°', cart: 'æ·»åŠ åˆ°è´­ç‰©è½¦', donate: 'æèµ ', subscribe: 'ç§Ÿç”¨', item_name: 'ç‰©å“', number: 'ç¼–å·', amount: 'é‡‘é¢', quantity: 'æ•°é‡' },
			zh_HK: { buynow: 'ç«‹å³è²·', cart: 'åŠ å…¥è³¼ç‰©è»Š', donate: 'ææ¬¾', subscribe: 'è¨‚ç”¨', item_name: 'é …ç›®', number: 'è™Ÿç¢¼', amount: 'é‡‘é¡', quantity: 'æ•¸é‡' },
			zh_TW: { buynow: 'ç«‹å³è³¼', cart: 'åŠ åˆ°è³¼ç‰©è»Š', donate: 'ææ¬¾', subscribe: 'è¨‚é–±', item_name: 'å•†å“', number: 'å•†å“ç·¨è™Ÿ', amount: 'å–®åƒ¹', quantity: 'æ•¸é‡' },
			zh_XC: { buynow: 'ç«‹å³è´­ä¹°', cart: 'æ·»åŠ åˆ°è´­ç‰©è½¦', donate: 'æèµ ', subscribe: 'ç§Ÿç”¨', item_name: 'ç‰©å“', number: 'ç¼–å·', amount: 'é‡‘é¢', quantity: 'æ•°é‡' }
		};

	if (!PAYPAL.apps.ButtonFactory) {

		/**
		 * Initial config for the app. These values can be overridden by the page.
		 */
		app.config = {
			labels: {}
		};

		/**
		 * A count of each type of button on the page
		 */
		app.buttons = {
			buynow: 0,
			cart: 0,
			donate: 0,
			qr: 0,
			subscribe: 0
		};

		/**
		 * Renders a button in place of the given element
		 *
		 * @param business {Object} The ID or email address of the merchant to create the button for
		 * @param raw {Object} An object of key/value data to set as button params
		 * @param type (String) The type of the button to render
		 * @param parent {HTMLElement} The element to add the button to (Optional)
		 * @return {HTMLElement}
		 */
		app.create = function (business, raw, type, parent) {
			var data = new DataStore(), button, key, env;

			if (!business) { return false; }

			// Normalize the data's keys and add to a data store
			for (key in raw) {
				data.add(prettyParams[key] || key, raw[key].value, raw[key].isEditable);
			}

			// Defaults
			type = type || 'buynow';
			env = "www";
			if (data.items.env && data.items.env.value) {
				env += "." + data.items.env.value;
			}

			// Cart buttons
			if (type === 'cart') {
				data.add('cmd', '_cart');
				data.add('add', true);
			// Donation buttons
			} else if (type === 'donate') {
				data.add('cmd', '_donations');
			// Subscribe buttons
			} else if (type === 'subscribe') {
				data.add('cmd', '_xclick-subscriptions');

				// TODO: "amount" cannot be used in prettyParams since it's overloaded
				// Find a better way to do this
				if (data.items.amount && !data.items.a3) {
					data.add('a3', data.items.amount.value);
				}
			// Buy Now buttons
			} else {
				data.add('cmd', '_xclick');
			}

			// Add common data
			data.add('business', business);
			data.add('bn', bnCode.replace(/\{type\}/, type));
			data.add('env',  env);

			// Build the UI components
			if (type === 'qr') {
				button = buildQR(data, data.items.size);
				data.remove('size');
			} else {
				button = buildForm(data, type);
			}

			// Inject CSS
			injectCSS();

			// Register it
			this.buttons[type] += 1;

			// Add it to the DOM
			if (parent) {
				parent.appendChild(button);
			}

			return button;
		};


		PAYPAL.apps.ButtonFactory = app;
	}


	/**
	 * Injects button CSS in the <head>
	 *
	 * @return {void}
	 */
	function injectCSS() {
		var css, styleEl, paypalButton, paypalInput;

		if (document.getElementById('paypal-button')) {
			return;
		}

		css = '';
		styleEl = document.createElement('style');
		paypalButton = '.paypal-button';
		paypalInput = paypalButton + ' button';

		css += paypalButton + ' { white-space: nowrap; }';
		css += paypalInput + ' { white-space: nowrap; overflow: hidden; border-radius: 13px; font-family: "Arial", bold, italic; font-weight: bold; font-style: italic; border: 1px solid #ffa823; color: #0E3168; background: #ffa823; position: relative; text-shadow: 0 1px 0 rgba(255,255,255,.5); cursor: pointer; z-index: 0; }';
		css += paypalInput + ':before { content: " "; position: absolute; width: 100%; height: 100%; border-radius: 11px; top: 0; left: 0; background: #ffa823; background: -webkit-linear-gradient(top, #FFAA00 0%,#FFAA00 80%,#FFF8FC 100%); background: -moz-linear-gradient(top, #FFAA00 0%,#FFAA00 80%,#FFF8FC 100%); background: -ms-linear-gradient(top, #FFAA00 0%,#FFAA00 80%,#FFF8FC 100%); background: linear-gradient(top, #FFAA00 0%,#FFAA00 80%,#FFF8FC 100%); z-index: -2; }';
		css += paypalInput + ':after { content: " "; position: absolute; width: 98%; height: 60%; border-radius: 40px 40px 38px 38px; top: 0; left: 0; background: -webkit-linear-gradient(top, #fefefe 0%, #fed994 100%); background: -moz-linear-gradient(top, #fefefe 0%, #fed994 100%); background: -ms-linear-gradient(top, #fefefe 0%, #fed994 100%); background: linear-gradient(top, #fefefe 0%, #fed994 100%); z-index: -1; -webkit-transform: translateX(1%);-moz-transform: translateX(1%); -ms-transform: translateX(1%); transform: translateX(1%); }';
		css += paypalInput + '.small { padding: 3px 15px; font-size: 12px; }';
		css += paypalInput + '.large { padding: 4px 19px; font-size: 14px; }';

		styleEl.type = 'text/css';
		styleEl.id = 'paypal-button';

		if (styleEl.styleSheet) {
			styleEl.styleSheet.cssText = css;
		} else {
			styleEl.appendChild(document.createTextNode(css));
		}

		document.getElementsByTagName('head')[0].appendChild(styleEl);
	}


	/**
	 * Builds the form DOM structure for a button
	 *
	 * @param data {Object} An object of key/value data to set as button params
	 * @param type (String) The type of the button to render
	 * @return {HTMLElement}
	 */
	function buildForm(data, type) {
		var form = document.createElement('form'),
			btn = document.createElement('button'),
			hidden = document.createElement('input'),
			items = data.items,
			item, child, label, input, key, size, locale, localeText;

		form.method = 'post';
		form.action = paypalURL.replace('{env}', data.items.env.value);
		form.className = 'paypal-button';
		form.target = '_top';

		hidden.type = 'hidden';

		size = items.size && items.size.value || 'large';
		locale = items.lc && items.lc.value || 'en_US';
		localeText = locales[locale] || locales.en_US;

		for (key in items) {
			item = items[key];

			if (item.isEditable) {
				input = document.createElement('input');
				input.type = 'text';
				input.className = 'paypal-input';
				input.name = item.key;
				input.value = item.value;

				label = document.createElement('label');
				label.className = 'paypal-label';
				label.appendChild(document.createTextNode(app.config.labels[item.key] || localeText[item.key]));
				label.appendChild(input);

				child = document.createElement('p');
				child.className = 'paypal-group';
				child.appendChild(label);
			} else {
				input = child = hidden.cloneNode(true);
				input.name = item.key;
				input.value = item.value;
			}

			form.appendChild(child);
		}

		// Safari won't let you set read-only attributes on buttons.
		try {
			btn.type = 'submit';
		} catch (e) {
			btn.setAttribute('type', 'submit');
		}
		btn.className = 'paypal-button ' + size;
		btn.appendChild(document.createTextNode(localeText[type]));

		form.appendChild(btn);

		// If the Mini Cart is present then register the form
		if (PAYPAL.apps.MiniCart && data.items.cmd.value === '_cart') {
			var MiniCart = PAYPAL.apps.MiniCart;

			if (!MiniCart.UI.itemList) {
				MiniCart.render();
			}

			MiniCart.bindForm(form);
		}

		return form;
	}


	/**
	 * Builds the image for a QR code
	 *
	 * @param data {Object} An object of key/value data to set as button params
	 * @param size {String} The size of QR code's longest side
	 * @return {HTMLElement}
	 */
	function buildQR(data, size) {
		var baseUrl = paypalURL.replace('{env}', data.items.env.value);

		var img = document.createElement('img'),
			url = baseUrl + '?',
			pattern = 13,
			items = data.items,
			item, key;

		// QR defaults
		size = size && size.value || 250;

		for (key in items) {
			item = items[key];
			url += item.key + '=' + encodeURIComponent(item.value) + '&';
		}

		url = encodeURIComponent(url);
		img.src = qrCodeURL.replace('{env}', data.items.env.value).replace('{url}', url).replace('{pattern}', pattern).replace('{size}', size);
		return img;
	}


	/**
	 * Utility function to polyfill dataset functionality with a bit of a spin
	 *
	 * @param el {HTMLElement} The element to check
	 * @return {Object}
	 */
	function getDataSet(el) {
		var dataset = {}, attrs, attr, matches, len, i;

		if ((attrs = el.attributes)) {
			for (i = 0, len = attrs.length; i < len; i++) {
				attr = attrs[i];

				if ((matches = /^data-([a-z0-9_]+)(-editable)?/i.exec(attr.name))) {
					dataset[matches[1]] = {
						value: attr.value,
						isEditable: !!matches[2]
					};
				}
			}
		}

		return dataset;
	}


	/**
	 * A storage object to create structured methods around a button's data
	 */
	function DataStore() {
		this.items = {};

		this.add = function (key, value, isEditable) {
			this.items[key] = {
				key: key,
				value: value,
				isEditable: isEditable
			};
		};

		this.remove = function (key) {
			delete this.items[key];
		};
	}


	// Init the buttons
	if (typeof document !== 'undefined') {
		var ButtonFactory = PAYPAL.apps.ButtonFactory,
			nodes = document.getElementsByTagName('script'),
			node, data, type, business, i, len;

		for (i = 0, len = nodes.length; i < len; i++) {
			node = nodes[i];

			if (!node || !node.src) { continue; }

			data = node && getDataSet(node);
			type = data && data.button && data.button.value;
			business = node.src.split('?merchant=')[1];

			if (business) {
				ButtonFactory.create(business, data, type, node.parentNode);

				// Clean up
				node.parentNode.removeChild(node);
			}
		}
	}


}());


// Export for CommonJS environments
if (typeof module === 'object' && typeof module.exports === 'object') {
	module.exports = PAYPAL;
}
