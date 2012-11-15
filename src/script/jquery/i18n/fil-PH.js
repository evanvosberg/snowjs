(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["fil-PH"] = $.extend(true, {}, en, {
        name: "fil-PH",
        englishName: "Filipino (Philippines)",
        nativeName: "Filipino (Pilipinas)",
        language: "fil",
        numberFormat: {
            currencies: {'':{
                symbol: "PhP"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    names: ["Linggo","Lunes","Martes","Mierkoles","Huebes","Biernes","Sabado"],
                    namesAbbr: ["Lin","Lun","Mar","Mier","Hueb","Bier","Saba"],
                    namesShort: ["L","L","M","M","H","B","S"]
                },
                months: {
                    names: ["Enero","Pebrero","Marso","Abril","Mayo","Hunyo","Hulyo","Agosto","Septyembre","Oktubre","Nobyembre","Disyembre",""],
                    namesAbbr: ["En","Peb","Mar","Abr","Mayo","Hun","Hul","Agos","Sept","Okt","Nob","Dis",""]
                },
                eras: [{"name":"Anno Domini","start":null,"offset":0}]
            })
        }
    }, regions["fil-PH"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));