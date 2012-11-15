(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["as-IN"] = $.extend(true, {}, en, {
        name: "as-IN",
        englishName: "Assamese (India)",
        nativeName: "অসমীয়া (ভাৰত)",
        language: "as",
        numberFormat: {
            groupSizes: [3,2],
            percent: {
                pattern: ["-n%","n%"],
                groupSizes: [3,2]
            },
            currencies: {'':{
                pattern: ["$ -n","n$"],
                groupSizes: [3,2],
                symbol: "ট"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': "-",
                firstDay: 1,
                days: {
                    names: ["সোমবাৰ","মঙ্গলবাৰ","বুধবাৰ","বৃহস্পতিবাৰ","শুক্রবাৰ","শনিবাৰ","ৰবিবাৰ"],
                    namesAbbr: ["সোম.","মঙ্গল.","বুধ.","বৃহ.","শুক্র.","শনি.","ৰবি."],
                    namesShort: ["সো","ম","বু","বৃ","শু","শ","র"]
                },
                months: {
                    names: ["জানুৱাৰী","ফেব্রুৱাৰী","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগষ্ট","চেপ্টেম্বর","অক্টোবর","নবেম্বর","ডিচেম্বর",""],
                    namesAbbr: ["জানু","ফেব্রু","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগষ্ট","চেপ্টে","অক্টো","নবে","ডিচে",""]
                },
                AM: ["ৰাতিপু","ৰাতিপু","ৰাতিপু"],
                PM: ["আবেলি","আবেলি","আবেলি"],
                eras: [{"name":"খ্রীষ্টাব্দ","start":null,"offset":0}],
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "yyyy,MMMM dd, dddd",
                    t: "tt h:mm",
                    T: "tt h:mm:ss",
                    f: "yyyy,MMMM dd, dddd tt h:mm",
                    F: "yyyy,MMMM dd, dddd tt h:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM,yy",
                    l: "dd-MM-yyyy tt h:mm",
                    L: "dd-MM-yyyy tt h:mm:ss"
                }
            })
        }
    }, regions["as-IN"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));