(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["ha"] = $.extend(true, {}, en, {
        name: "ha",
        englishName: "Hausa",
        nativeName: "Hausa",
        language: "ha",
        numberFormat: {
            currencies: {'':{
                pattern: ["$-n","$ n"],
                symbol: "N"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    names: ["Lahadi","Litinin","Talata","Laraba","Alhamis","Juma'a","Asabar"],
                    namesAbbr: ["Lah","Lit","Tal","Lar","Alh","Jum","Asa"],
                    namesShort: ["L","L","T","L","A","J","A"]
                },
                months: {
                    names: ["Januwaru","Febreru","Maris","Afrilu","Mayu","Yuni","Yuli","Agusta","Satumba","Oktocba","Nuwamba","Disamba",""],
                    namesAbbr: ["Jan","Feb","Mar","Afr","May","Yun","Yul","Agu","Sat","Okt","Nuw","Dis",""]
                },
                AM: ["Safe","safe","SAFE"],
                PM: ["Yamma","yamma","YAMMA"],
                eras: [{"name":"AD","start":null,"offset":0}],
                patterns: {
                    d: "d/M/yyyy",
                    l: "d/M/yyyy h:mm tt",
                    L: "d/M/yyyy h:mm:ss tt"
                }
            })
        }
    }, regions["ha"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));