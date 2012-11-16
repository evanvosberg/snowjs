(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["kok-IN"] = $.extend(true, {}, en, {
        name: "kok-IN",
        englishName: "Konkani (India)",
        nativeName: "कोंकणी (भारत)",
        language: "kok",
        numberFormat: {
            groupSizes: [3,2],
            percent: {
                groupSizes: [3,2]
            },
            currencies: {'':{
                pattern: ["$ -n","$ n"],
                groupSizes: [3,2],
                symbol: "रु"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': "-",
                firstDay: 1,
                days: {
                    names: ["आयतार","सोमार","मंगळार","बुधवार","बिरेस्तार","सुक्रार","शेनवार"],
                    namesAbbr: ["आय.","सोम.","मंगळ.","बुध.","बिरे.","सुक्र.","शेन."],
                    namesShort: ["आ","स","म","ब","ब","स","श"]
                },
                months: {
                    names: ["जानेवारी","फेब्रुवारी","मार्च","एप्रिल","मे","जून","जुलै","ऑगस्ट","सप्टेंबर","ऑक्टोबर","नोवेम्बर","डिसेंबर",""],
                    namesAbbr: ["जानेवारी","फेब्रुवारी","मार्च","एप्रिल","मे","जून","जुलै","ऑगस्ट","सप्टेंबर","ऑक्टोबर","नोवेम्बर","डिसेंबर",""]
                },
                AM: ["म.पू.","म.पू.","म.पू."],
                PM: ["म.नं.","म.नं.","म.नं."],
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "dd MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "dd MMMM yyyy HH:mm",
                    F: "dd MMMM yyyy HH:mm:ss",
                    M: "dd MMMM",
                    l: "dd-MM-yyyy HH:mm",
                    L: "dd-MM-yyyy HH:mm:ss"
                }
            })
        }
    }, regions["kok-IN"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));