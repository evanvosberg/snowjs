(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["hy-AM"] = $.extend(true, {}, en, {
        name: "hy-AM",
        englishName: "Armenian (Armenia)",
        nativeName: "Հայերեն (Հայաստան)",
        language: "hy",
        numberFormat: {
            currencies: {'':{
                pattern: ["-n $","n $"],
                symbol: "դր."
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["Կիրակի","Երկուշաբթի","Երեքշաբթի","Չորեքշաբթի","Հինգշաբթի","ՈՒրբաթ","Շաբաթ"],
                    namesAbbr: ["Կիր","Երկ","Երք","Չրք","Հնգ","ՈՒր","Շբթ"],
                    namesShort: ["Կ","Ե","Ե","Չ","Հ","Ո","Շ"]
                },
                months: {
                    names: ["Հունվար","Փետրվար","Մարտ","Ապրիլ","Մայիս","Հունիս","Հուլիս","Օգոստոս","Սեպտեմբեր","Հոկտեմբեր","Նոյեմբեր","Դեկտեմբեր",""],
                    namesAbbr: ["ՀՆՎ","ՓՏՎ","ՄՐՏ","ԱՊՐ","ՄՅՍ","ՀՆՍ","ՀԼՍ","ՕԳՍ","ՍԵՊ","ՀՈԿ","ՆՈՅ","ԴԵԿ",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "d MMMM, yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d MMMM, yyyy H:mm",
                    F: "d MMMM, yyyy H:mm:ss",
                    M: "d MMMM",
                    l: "dd.MM.yyyy H:mm",
                    L: "dd.MM.yyyy H:mm:ss"
                }
            })
        }
    }, regions["hy-AM"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));