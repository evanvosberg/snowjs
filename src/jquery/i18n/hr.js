(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["hr"] = $.extend(true, {}, en, {
        name: "hr",
        englishName: "Croatian",
        nativeName: "hrvatski",
        language: "hr",
        numberFormat: {
            pattern: ["- n"],
            ',': ".",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': ".",
                '.': ","
            },
            currencies: {'':{
                pattern: ["-n $","n $"],
                ',': ".",
                '.': ",",
                symbol: "kn"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"],
                    namesAbbr: ["ned","pon","uto","sri","čet","pet","sub"],
                    namesShort: ["ne","po","ut","sr","če","pe","su"]
                },
                months: {
                    names: ["siječanj","veljača","ožujak","travanj","svibanj","lipanj","srpanj","kolovoz","rujan","listopad","studeni","prosinac",""],
                    namesAbbr: ["sij","vlj","ožu","tra","svi","lip","srp","kol","ruj","lis","stu","pro",""]
                },
                monthsGenitive: {
                    names: ["siječnja","veljače","ožujka","travnja","svibnja","lipnja","srpnja","kolovoza","rujna","listopada","studenog","prosinca",""],
                    namesAbbr: ["sij","vlj","ožu","tra","svi","lip","srp","kol","ruj","lis","stu","pro",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "d.M.yyyy.",
                    D: "d. MMMM yyyy.",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d. MMMM yyyy. H:mm",
                    F: "d. MMMM yyyy. H:mm:ss",
                    M: "d. MMMM",
                    l: "d.M.yyyy. H:mm",
                    L: "d.M.yyyy. H:mm:ss"
                }
            })
        }
    }, regions["hr"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));