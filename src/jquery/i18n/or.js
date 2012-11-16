(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["or"] = $.extend(true, {}, en, {
        name: "or",
        englishName: "Oriya",
        nativeName: "ଓଡ଼ିଆ",
        language: "or",
        numberFormat: {
            groupSizes: [3,2],
            percent: {
                groupSizes: [3,2]
            },
            currencies: {'':{
                pattern: ["$ -n","$ n"],
                groupSizes: [3,2],
                symbol: "ଟ"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': "-",
                days: {
                    names: ["ରବିବାର","ସୋମବାର","ମଙ୍ଗଳବାର","ବୁଧବାର","ଗୁରୁବାର","ଶୁକ୍ରବାର","ଶନିବାର"],
                    namesAbbr: ["ରବି.","ସୋମ.","ମଙ୍ଗଳ.","ବୁଧ.","ଗୁରୁ.","ଶୁକ୍ର.","ଶନି."],
                    namesShort: ["ର","ସୋ","ମ","ବୁ","ଗୁ","ଶୁ","ଶ"]
                },
                months: {
                    names: ["ଜାନୁୟାରୀ","ଫ୍ରେବୃୟାରୀ","ମାର୍ଚ୍ଚ","ଏପ୍ରିଲ୍‌","ମେ","ଜୁନ୍‌","ଜୁଲାଇ","ଅଗଷ୍ଟ","ସେପ୍ଟେମ୍ବର","ଅକ୍ଟୋବର","ନଭେମ୍ବର","(ଡିସେମ୍ବର",""],
                    namesAbbr: ["ଜାନୁୟାରୀ","ଫ୍ରେବୃୟାରୀ","ମାର୍ଚ୍ଚ","ଏପ୍ରିଲ୍‌","ମେ","ଜୁନ୍‌","ଜୁଲାଇ","ଅଗଷ୍ଟ","ସେପ୍ଟେମ୍ବର","ଅକ୍ଟୋବର","ନଭେମ୍ବର","(ଡିସେମ୍ବର",""]
                },
                eras: [{"name":"ଖ୍ରୀଷ୍ଟାବ୍ଦ","start":null,"offset":0}],
                patterns: {
                    d: "dd-MM-yy",
                    D: "dd MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "dd MMMM yyyy HH:mm",
                    F: "dd MMMM yyyy HH:mm:ss",
                    M: "dd MMMM",
                    l: "dd-MM-yy HH:mm",
                    L: "dd-MM-yy HH:mm:ss"
                }
            })
        }
    }, regions["or"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));