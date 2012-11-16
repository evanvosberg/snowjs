(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["pl"] = $.extend(true, {}, en, {
        name: "pl",
        englishName: "Polish",
        nativeName: "polski",
        language: "pl",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': " ",
                '.': ","
            },
            currencies: {'':{
                pattern: ["-n $","n $"],
                ',': " ",
                '.': ",",
                symbol: "zł"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': "-",
                firstDay: 1,
                days: {
                    names: ["niedziela","poniedziałek","wtorek","środa","czwartek","piątek","sobota"],
                    namesAbbr: ["N","Pn","Wt","Śr","Cz","Pt","So"],
                    namesShort: ["N","Pn","Wt","Śr","Cz","Pt","So"]
                },
                months: {
                    names: ["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień",""],
                    namesAbbr: ["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru",""]
                },
                monthsGenitive: {
                    names: ["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia",""],
                    namesAbbr: ["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "d MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "d MMMM yyyy HH:mm",
                    F: "d MMMM yyyy HH:mm:ss",
                    M: "d MMMM",
                    Y: "MMMM yyyy",
                    l: "yyyy-MM-dd HH:mm",
                    L: "yyyy-MM-dd HH:mm:ss"
                }
            })
        }
    }, regions["pl"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));