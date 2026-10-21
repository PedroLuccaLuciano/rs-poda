// Gerado por scripts/optimize-images.py — não edite à mão.
export type ImageVariant = { width: number; height: number; widths: number[]; file?: string };

export const IMAGES = {
  "equipe": {
    "hero": {
      "width": 1200,
      "height": 896,
      "widths": [
        400,
        640,
        960,
        1200
      ]
    },
    "hero-mobile": {
      "width": 538,
      "height": 896,
      "widths": [
        400,
        538
      ]
    }
  },
  "munck1": {
    "square": {
      "width": 899,
      "height": 749,
      "widths": [
        400,
        640,
        800
      ]
    },
    "full": {
      "width": 899,
      "height": 1599,
      "widths": [
        400,
        640,
        899
      ]
    }
  },
  "munck2": {
    "square": {
      "width": 899,
      "height": 749,
      "widths": [
        400,
        640,
        800
      ]
    },
    "full": {
      "width": 899,
      "height": 1599,
      "widths": [
        400,
        640,
        899
      ]
    }
  },
  "munck3": {
    "square": {
      "width": 899,
      "height": 749,
      "widths": [
        400,
        640,
        800
      ]
    },
    "full": {
      "width": 899,
      "height": 1599,
      "widths": [
        400,
        640,
        899
      ]
    }
  },
  "munck5": {
    "card": {
      "width": 899,
      "height": 450,
      "widths": [
        400,
        640,
        800
      ]
    }
  },
  "munck6": {
    "square": {
      "width": 899,
      "height": 749,
      "widths": [
        400,
        640,
        800
      ]
    },
    "full": {
      "width": 899,
      "height": 1599,
      "widths": [
        400,
        640,
        899
      ]
    }
  },
  "derrubada": {
    "card": {
      "width": 899,
      "height": 450,
      "widths": [
        400,
        640,
        800
      ]
    },
    "square": {
      "width": 899,
      "height": 749,
      "widths": [
        400,
        640,
        800
      ]
    },
    "full": {
      "width": 899,
      "height": 1599,
      "widths": [
        400,
        640,
        899
      ]
    }
  },
  "rocada1": {
    "card": {
      "width": 1537,
      "height": 768,
      "widths": [
        400,
        640,
        800
      ]
    },
    "square": {
      "width": 1228,
      "height": 1023,
      "widths": [
        400,
        640,
        800
      ]
    },
    "full": {
      "width": 1537,
      "height": 1023,
      "widths": [
        400,
        640,
        960,
        1200
      ]
    }
  },
  "rocada": {
    "portrait": {
      "width": 899,
      "height": 1124,
      "widths": [
        320,
        480,
        640
      ]
    }
  },
  "limpeza": {
    "portrait": {
      "width": 899,
      "height": 1124,
      "widths": [
        320,
        480,
        640
      ]
    }
  },
  "poda-altura": {
    "portrait": {
      "width": 899,
      "height": 1124,
      "widths": [
        320,
        480,
        640
      ]
    }
  },
  "poda-escalada": {
    "card": {
      "width": 1599,
      "height": 800,
      "widths": [
        400,
        640,
        800
      ]
    },
    "portrait": {
      "width": 719,
      "height": 899,
      "widths": [
        320,
        480,
        640
      ]
    },
    "bg": {
      "width": 1599,
      "height": 899,
      "widths": [
        640,
        960
      ]
    }
  },
  "icone3": {
    "h96": {
      "width": 96,
      "height": 96,
      "widths": [
        96
      ],
      "file": "icone3-h96.webp"
    },
    "h128": {
      "width": 128,
      "height": 128,
      "widths": [
        128
      ],
      "file": "icone3-h128.webp"
    }
  },
  "essencis": {
    "h80": {
      "width": 299,
      "height": 80,
      "widths": [
        299
      ],
      "file": "essencis-h80.webp"
    }
  },
  "laureano": {
    "h104": {
      "width": 276,
      "height": 104,
      "widths": [
        276
      ],
      "file": "laureano-h104.webp"
    }
  },
  "logo-arca": {
    "h168": {
      "width": 198,
      "height": 168,
      "widths": [
        198
      ],
      "file": "logo-arca-h168.webp"
    }
  },
  "navalsul": {
    "h168": {
      "width": 205,
      "height": 168,
      "widths": [
        205
      ],
      "file": "navalsul-h168.webp"
    }
  },
  "trg-logo": {
    "h96": {
      "width": 293,
      "height": 96,
      "widths": [
        293
      ],
      "file": "trg-logo-h96.webp"
    }
  },
  "farm-hill": {
    "h168": {
      "width": 182,
      "height": 168,
      "widths": [
        182
      ],
      "file": "farm-hill-h168.webp"
    }
  }
} satisfies Record<string, Record<string, ImageVariant>>;

export type ImageName = keyof typeof IMAGES;
