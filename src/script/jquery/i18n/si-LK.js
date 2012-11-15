(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["si-LK"] = $.extend(true, {}, en, {
        name: "si-LK",
        englishName: "Sinhala (Sri Lanka)",
        nativeName: "සිංහල (ශ්‍රී ලංකා)",
        language: "si",
        numberFormat: {
            groupSizes: [3,2],
            percent: {
                groupSizes: [3,2]
            },
            currencies: {'':{
                pattern: ["($ n)","$ n"],
                symbol: "රු."
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': "-",
                firstDay: 1,
                days: {
                    names: ["ඉරිදා","සඳුදා","අඟහරුවාදා","බදාදා","බ්‍රහස්පතින්දා","සිකුරාදා","සෙනසුරාදා"],
                    namesAbbr: ["ඉරිදා","සඳුදා","කුජදා","බුදදා","ගුරුදා","කිවිදා","ශනිදා"],
                    namesShort: ["ඉ","ස","අ","බ","බ්‍ර","සි","සෙ"]
                },
                months: {
                    names: ["ජනවාරි","පෙබරවාරි","මාර්තු","අ‌ප්‍රේල්","මැයි","ජූනි","ජූලි","අ‌ගෝස්තු","සැප්තැම්බර්","ඔක්තෝබර්","නොවැම්බර්","දෙසැම්බර්",""],
                    namesAbbr: ["ජන.","පෙබ.","මාර්තු.","අප්‍රේල්.","මැයි.","ජූනි.","ජූලි.","අගෝ.","සැප්.","ඔක්.","නොවැ.","දෙසැ.",""]
                },
                AM: ["පෙ.ව.","පෙ.ව.","පෙ.ව."],
                PM: ["ප.ව.","ප.ව.","ප.ව."],
                eras: [{"name":"ක්‍රි.ව.","start":null,"offset":0}],
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "yyyy MMMM' මස 'dd' වැනිදා 'dddd",
                    f: "yyyy MMMM' මස 'dd' වැනිදා 'dddd h:mm tt",
                    F: "yyyy MMMM' මස 'dd' වැනිදා 'dddd h:mm:ss tt",
                    Y: "yyyy MMMM",
                    l: "yyyy-MM-dd h:mm tt",
                    L: "yyyy-MM-dd h:mm:ss tt"
                }
            })
        }
    }, regions["si-LK"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));