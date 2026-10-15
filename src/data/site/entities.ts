// Local business entities and official schedule.
export const entities = [
  {
    "@type": "SportsActivityLocation",
    "@id": "https://tshr-bjj.com/#sportsactivitylocation",
    "name": "Over Limit 本庄",
    "alternateName": "Over Limit Honjo",
    "url": "https://tshr-bjj.com/",
    "mainEntityOfPage": {"@id":"https://tshr-bjj.com/#webpage"},
    "logo": "https://tshr-bjj.com/LOGO.png",
    "image": [
      "https://tshr-bjj.com/LOGO.png",
      "https://tshr-bjj.com/new-ins.webp",
      "https://tshr-bjj.com/flow1.webp"
    ],
    "description": "本庄駅徒歩6分・無料駐車場完備。本庄市のブラジリアン柔術道場「Over Limit 本庄」。初心者・女性・キッズ大歓迎。世界大会王者（黒帯3段）が直接指導。見学・無料体験受付中。",
    "sport": "Brazilian Jiu-Jitsu",
    "telephone": "090-6516-3248",
    "priceRange": "¥2,200 - ¥9,800",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Wednesday"],
        "opens": "10:00",
        "closes": "11:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Wednesday"],
        "opens": "19:00",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Thursday"],
        "opens": "19:00",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Friday"],
        "opens": "18:00",
        "closes": "22:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "19:00",
        "closes": "22:00"
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.2323399,
      "longitude": 139.1862549
    },
    "hasMap": "https://www.google.com/maps/search/?api=1&query=Over+Limit+%E6%9C%AC%E5%BA%84+%E5%9F%BC%E7%8E%89%E7%9C%8C%E6%9C%AC%E5%BA%84%E5%B8%82%E3%81%91%E3%82%84%E6%9C%A81%E4%B8%81%E7%9B%AE1-16",
    "address": {
      "@type": "PostalAddress",
      "postalCode": "367-0042",
      "addressRegion": "埼玉県",
      "addressLocality": "本庄市",
      "streetAddress": "けや木1丁目1-16",
      "addressCountry": "JP"
    },
    "areaServed": [
      "本庄市",
      "上里町",
      "児玉町",
      "神川町",
      "美里町",
      "深谷市",
      "伊勢崎市"
    ],
    "sameAs": [
      "https://www.instagram.com/tshr_jiujitsu/",
      "https://www.facebook.com/groups/304416070927536"
    ],
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "無料駐車場あり",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "JR高崎線「本庄」駅北口より徒歩6分",
        "value": true
      }
    ],
    "employee": {
      "@id": "https://tshr-bjj.com/#instructor-seiichi-tashiro"
    },
    "hasOfferCatalog": {
      "@id": "https://tshr-bjj.com/#offer-catalog"
    }
  },
  {
    "@type": "Person",
    "@id": "https://tshr-bjj.com/#instructor-seiichi-tashiro",
    "name": "田代 セイイチ",
    "jobTitle": "代表・ヘッドインストラクター",
    "image": "https://tshr-bjj.com/new-ins.webp",
    "worksFor": {
      "@id": "https://tshr-bjj.com/#sportsactivitylocation"
    },
    "description": "Over Limit 本庄の代表・ヘッドインストラクター。ブラジリアン柔術 Black Belt（黒帯3段）。2026, 2025 SJJF WORLD Championship 優勝、JBJJF ALL Japan Master 2回優勝、IBJJF Asian Championship 3回優勝、2015 IBJJF WORLD MASTER 3位。",
    "award": [
      "2026 SJJF WORLD Championship 優勝",
      "2025 SJJF WORLD Championship 優勝",
      "JBJJF ALL Japan Master 2回優勝",
      "IBJJF Asian Championship 3回優勝",
      "2015 IBJJF WORLD MASTER 3位"
    ]
  },
  {
    "@type": "OfferCatalog",
    "@id": "https://tshr-bjj.com/#offer-catalog",
    "name": "Over Limit 本庄 料金プラン",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "入会金",
        "price": "0",
        "priceCurrency": "JPY",
        "description": "入会金無料"
      },
      {
        "@type": "Offer",
        "name": "キッズクラス",
        "price": "5000",
        "priceCurrency": "JPY",
        "description": "小学1〜6年生対象の月額プラン"
      },
      {
        "@type": "Offer",
        "name": "大人一般クラス 女性・中高生",
        "price": "7800",
        "priceCurrency": "JPY",
        "description": "女性・中高生向けの月額プラン"
      },
      {
        "@type": "Offer",
        "name": "大人一般クラス フルタイム男性",
        "price": "9800",
        "priceCurrency": "JPY",
        "description": "一般男性向けの月額フルタイムプラン"
      },
      {
        "@type": "Offer",
        "name": "ビジター",
        "price": "2200",
        "priceCurrency": "JPY",
        "description": "1回利用のビジター料金"
      }
    ]
  },
  {
    "@type": "Course",
    "@id": "https://tshr-bjj.com/#course-kids",
    "name": "キッズ柔術クラス",
    "description": "小学1〜6年生を対象としたブラジリアン柔術クラス。礼儀作法、基礎体力、運動神経を楽しく養います。",
    "provider": {
      "@id": "https://tshr-bjj.com/#sportsactivitylocation"
    }
  },
  {
    "@type": "Course",
    "@id": "https://tshr-bjj.com/#course-beginner",
    "name": "ビギナー柔術クラス",
    "description": "柔術初心者向けのクラス。基本の動きやテクニックを丁寧に学べます。",
    "provider": {
      "@id": "https://tshr-bjj.com/#sportsactivitylocation"
    }
  },
  {
    "@type": "Course",
    "@id": "https://tshr-bjj.com/#course-all-level",
    "name": "オールレベル柔術クラス",
    "description": "初心者から経験者まで参加できるブラジリアン柔術クラスです。",
    "provider": {
      "@id": "https://tshr-bjj.com/#sportsactivitylocation"
    }
  },
  {
    "@type": "Course",
    "@id": "https://tshr-bjj.com/#course-nogi",
    "name": "NOGIクラス",
    "description": "道着を使わないグラップリング形式のクラスです。",
    "provider": {
      "@id": "https://tshr-bjj.com/#sportsactivitylocation"
    }
  }
];
