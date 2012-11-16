(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["sa-IN"] = $.extend(true, {}, en, {
        name: "sa-IN",
        englishName: "Sanskrit (India)",
        nativeName: "संस्कृत (भारतम्)",
        language: "sa",
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
                days: {
                    names: ["रविवासरः","सोमवासरः","मङ्गलवासरः","बुधवासरः","गुरुवासरः","शुक्रवासरः","शनिवासरः"],
                    namesAbbr: ["रविवासरः","सोमवासरः","मङ्गलवासरः","बुधवासरः","गुरुवासरः","शुक्रवासरः","शनिवासरः"],
                    namesShort: ["र","स","म","ब","ग","श","श"]
                },
                months: {
                    names: ["जनवरी","फरवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितम्बर","अक्तूबर","नवम्बर","दिसम्बर",""],
                    namesAbbr: ["जनवरी","फरवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितम्बर","अक्तूबर","नवम्बर","दिसम्बर",""]
                },
                AM: ["पूर्वाह्न","पूर्वाह्न","पूर्वाह्न"],
                PM: ["अपराह्न","अपराह्न","अपराह्न"],
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "dd MMMM yyyy dddd",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "dd MMMM yyyy dddd HH:mm",
                    F: "dd MMMM yyyy dddd HH:mm:ss",
                    M: "dd MMMM",
                    l: "dd-MM-yyyy HH:mm",
                    L: "dd-MM-yyyy HH:mm:ss"
                }
            })
        }
    }, regions["sa-IN"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));