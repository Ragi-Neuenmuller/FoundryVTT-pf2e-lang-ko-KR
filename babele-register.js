Hooks.on('init', () => {
	game.settings.register("pf2e-ko-kr", "show-original-name", {
		name: "컴펜디움 원본 명칭 표시",
		hint: "컴펜디움 원본 명칭을 번역된 명칭 옆에 나란히 표시합니다. 예시) 화염구 Fireball",
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
		onChange: _ => window.location.reload()
	});

	if (typeof Babele !== 'undefined') {
		Babele.get().register({
			module: 'pf2e-ko-kr',
			lang: 'ko',
			dir: 'compendium'
		});

		if (!game.settings.get("pf2e-ko-kr", "show-original-name")) return;
		TranslatedCompendium.prototype.translateOrigin = TranslatedCompendium.prototype.translate;
		TranslatedCompendium.prototype.translate = function(data) {
			let originalName = data.name;
//			let originalDescription = data.description;
			let translatedData = this.translateOrigin(data);
			if (originalName !== translatedData.name){
				translatedData.name = translatedData.name + ' ' + originalName;
//				translatedData.description = translatedData.description + '<br><hr><br>' + originalDescription;
			}
			return translatedData;
		};
		TranslatedCompendium.prototype.i18nNameOrigin = TranslatedCompendium.prototype.i18nName;
		TranslatedCompendium.prototype.i18nName = function(idx) {
			let translated = this.i18nNameOrigin(idx);
			return translated === idx.name ? translated : translated + ' ' + idx.name;
		};
	}
});
