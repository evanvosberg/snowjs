(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["af-ZA"] = $.extend(true, {}, en, {
        name: "af-ZA",
        englishName: "Afrikaans (South Africa)",
        nativeName: "Afrikaans (Suid Afrika)",
        language: "af",
        numberFormat: {
            percent: {
                pattern: ["-n%","n%"]
            },
            currencies: {'':{
                pattern: ["$-n","$ n"],
                symbol: "R"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    names: ["Sondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrydag","Saterdag"],
                    namesAbbr: ["Son","Maan","Dins","Woen","Dond","Vry","Sat"],
                    namesShort: ["So","Ma","Di","Wo","Do","Vr","Sa"]
                },
                months: {
                    names: ["Januarie","Februarie","Maart","April","Mei","Junie","Julie","Augustus","September","Oktober","November","Desember",""],
                    namesAbbr: ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Des",""]
                },
                patterns: {
                    d: "yyyy/MM/dd",
                    D: "dd MMMM yyyy",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
                    f: "dd MMMM yyyy hh:mm tt",
                    F: "dd MMMM yyyy hh:mm:ss tt",
                    M: "dd MMMM",
                    Y: "MMMM yyyy",
                    l: "yyyy/MM/dd hh:mm tt",
                    L: "yyyy/MM/dd hh:mm:ss tt"
                }
            })
        }
    }, regions["af-ZA"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));