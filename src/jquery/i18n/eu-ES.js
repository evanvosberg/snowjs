(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["eu-ES"] = $.extend(true, {}, en, {
        name: "eu-ES",
        englishName: "Basque (Basque)",
        nativeName: "euskara (euskara)",
        language: "eu",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                ',': ".",
                '.': ","
            },
            currencies: {'':{
                pattern: ["-n $","n $"],
                ',': ".",
                '.': ",",
                symbol: "€"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                firstDay: 1,
                days: {
                    names: ["igandea","astelehena","asteartea","asteazkena","osteguna","ostirala","larunbata"],
                    namesAbbr: ["ig.","al.","as.","az.","og.","or.","lr."],
                    namesShort: ["ig","al","as","az","og","or","lr"]
                },
                months: {
                    names: ["urtarrila","otsaila","martxoa","apirila","maiatza","ekaina","uztaila","abuztua","iraila","urria","azaroa","abendua",""],
                    namesAbbr: ["urt.","ots.","mar.","api.","mai.","eka.","uzt.","abu.","ira.","urr.","aza.","abe.",""]
                },
                AM: null,
                PM: null,
                eras: [{"name":"d.C.","start":null,"offset":0}],
                patterns: {
                    d: "yyyy/MM/dd",
                    D: "dddd, yyyy.'eko' MMMM'k 'd",
                    t: "HH:mm",
                    T: "H:mm:ss",
                    f: "dddd, yyyy.'eko' MMMM'k 'd HH:mm",
                    F: "dddd, yyyy.'eko' MMMM'k 'd H:mm:ss",
                    Y: "yyyy.'eko' MMMM",
                    l: "yyyy/MM/dd HH:mm",
                    L: "yyyy/MM/dd H:mm:ss"
                }
            })
        }
    }, regions["eu-ES"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));