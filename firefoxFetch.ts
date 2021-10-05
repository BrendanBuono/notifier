/**
 * Simulates a network request from FireFox using Deno fetch
 */ 
export async function firefoxFetch(url:string, host:string): Promise<Response> {
    return await fetch(url, {
        headers: {
          "Host": host,
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:91.0) Gecko/20100101 Firefox/91.0",
          "Accept":
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
          "Connection": "keep-alive",
          "Cookie":
            "aka_locale=en-US; geoCulture=en-US; mobileOverride=desktop; defCulture=en-US; AMCV_EA76ADE95776D2EC7F000101%40AdobeOrg=-1303530583%7CMCIDTS%7C18720%7CMCMID%7C01974259517118000624214846989535405603%7CMCAAMLH-1617999423%7C7%7CMCAAMB-1617999423%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCOPTOUT-1617401823s%7CNONE%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-18727%7CvVersion%7C3.3.0%7CMCCIDH%7C385333444; mbox=PC#d52413d15a3640aca0c5250f08899faf.34_0#1680639425|session#27df7bedee1a4d9aabfe980ff0756621#1633372115; optimizelyEndUserId=oeu1612206010520r0.8312208489669788; MUID=00594415D5A36B03327B49EAD1A368FC; X-SFW-FD-Features=ids=sfwaaa%2catperf680t2%2c11742c%2c10718t1%2c12125c%2c12579c%2c11030c%2c11749c%2ctasmigration010%2ccartemberpl%2cdisablenorefunds%2cdaconvertenabled%2c12080t1%2cenablescarlettmetadata%2credirecttogarrison&imp=b4d9af1d-92f9-4c06-9306-723f198ddddd; MSFPC=GUID=0ebbebf458b24a57ba494eac49782ab9&HASH=0ebb&LV=202101&V=4&LU=1611934136169; _cs_c=0; __CT_Data=gpv=5&ckp=tld&dm=xbox.com&apv_1002_www32=8&cpv_1002_www32=6&rpv_1002_www32=4; _cs_id=94e30f2b-2fd2-aab1-a5d5-035f9e70142e.1612206012.7.1617398634.1617398634.1613561419.1646370012600.None.1; WRUIDCD03072018=3181672052965982; UtcOffsetMinutes=-240; MicrosoftApplicationsTelemetryDeviceId=fe83dda2-6ceb-4602-b5d6-0275b0a6780f; ANON=A=C1049EFEFC72AE1AFD89F16AFFFFFFFF&E=1a03&W=1; NAP=V=1.9&E=19a9&C=LyThnI2CAzUGQ6moB-oQQB1Wx_PbVRRhLbwndmRMTqH6BZl_7Dasgg&W=1; akavpau_xbpl=1633370554~id=7304b4f728479b5f05b49e3ad8c58a2e; at_check=true; ai_session=h5KK1Q6OHqWCuS+Fr6/p8t|1633370255314|1633370255557; MSCC=NR",
          "Upgrade-Insecure-Requests": "1",
          "Sec-Fetch-Dest": "document",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-Site": "none",
          "Sec-Fetch-User": "?1",
          "Cache-Control": "max-age=0",
        },
      });
}