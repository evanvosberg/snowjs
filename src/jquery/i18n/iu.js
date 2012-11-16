(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["iu"] = $.extend(true, {}, en, {
        name: "iu",
        englishName: "Inuktitut",
        nativeName: "Inuktitut",
        language: "iu",
        numberFormat: {
            groupSizes: [3,0],
            percent: {
                groupSizes: [3,0]
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    names: ["Naattiinguja","Naggajjau","Aippiq","Pingatsiq","Sitammiq","Tallirmiq","Sivataarvik"],
                    namesAbbr: ["Nat","Nag","Aip","Pi","Sit","Tal","Siv"],
                    namesShort: ["N","N","A","P","S","T","S"]
                },
                months: {
                    names: ["Jaannuari","Viivvuari","Maatsi","Iipuri","Mai","Juuni","Julai","Aaggiisi","Sitipiri","Utupiri","Nuvipiri","Tisipiri",""],
                    namesAbbr: ["Jan","Viv","Mas","Ipu","Mai","Jun","Jul","Agi","Sii","Uut","Nuv","Tis",""]
                },
                patterns: {
                    d: "d/MM/yyyy",
                    D: "ddd, MMMM dd,yyyy",
                    f: "ddd, MMMM dd,yyyy h:mm tt",
                    F: "ddd, MMMM dd,yyyy h:mm:ss tt",
                    l: "d/MM/yyyy h:mm tt",
                    L: "d/MM/yyyy h:mm:ss tt"
                }
            })
        }
    }, regions["iu"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));