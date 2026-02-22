// Data Forum
export const forumData = [
  {
    id: 1,
    author: 'Budi Santoso',
    avatar: 'https://i.pravatar.cc/150?img=1',
    time: '2 jam yang lalu',
    title: 'Tips Menanam Cabai di Musim Hujan',
    content:
      'Halo semua, saya ingin berbagi pengalaman menanam cabai saat musim hujan. Ada beberapa hal yang perlu diperhatikan seperti drainase yang baik, penggunaan mulsa plastik, dan pemilihan varietas yang tahan terhadap kelembaban tinggi.',
    likes: 24,
    comments: 5,
  },
  {
    id: 2,
    author: 'Siti Aminah',
    avatar: 'https://i.pravatar.cc/150?img=2',
    time: '5 jam yang lalu',
    title: 'Cara Mengatasi Hama pada Tanaman Padi',
    content:
      'Saya baru saja mengalami serangan hama pada tanaman padi. Berikut adalah cara yang saya gunakan untuk mengatasinya: menggunakan pestisida organik, rotasi tanaman, dan memanfaatkan musuh alami hama.',
    images: [
      'https://picsum.photos/200/150?random=3',
      'https://picsum.photos/200/150?random=4',
      'https://picsum.photos/200/150?random=5',
      'https://picsum.photos/200/150?random=6',
    ],
    likes: 45,
    comments: 8,
  },
  {
    id: 3,
    author: 'Ahmad Hidayat',
    avatar: 'https://i.pravatar.cc/150?img=3',
    time: '1 hari yang lalu',
    title: 'Pupuk Organik vs Pupuk Kimia',
    content:
      'Ada yang punya pengalaman membandingkan hasil panen menggunakan pupuk organik vs pupuk kimia? Saya tertarik untuk beralih ke pupuk organik tapi masih ragu dengan hasilnya.',
    images: ['https://picsum.photos/200/150?random=7'],
    likes: 67,
    comments: 12,
  },
  {
    id: 4,
    author: 'Dewi Lestari',
    avatar: 'https://i.pravatar.cc/150?img=9',
    time: '2 hari yang lalu',
    title: 'Budidaya Tomat Hidroponik untuk Pemula',
    content:
      'Bagi yang ingin memulai budidaya tomat hidroponik, saya punya beberapa tips dasar yang mudah diikuti. Sistem hidroponik lebih hemat air dan bisa dilakukan di lahan terbatas.',
    images: [
      'https://picsum.photos/200/150?random=9',
      'https://picsum.photos/200/150?random=10',
    ],
    likes: 89,
    comments: 6,
  },
  {
    id: 5,
    author: 'Joko Widodo',
    avatar: 'https://i.pravatar.cc/150?img=10',
    time: '3 hari yang lalu',
    title: 'Pengalaman Panen Jagung Manis',
    content:
      'Alhamdulillah panen jagung manis kemarin sangat memuaskan. Kunci suksesnya ada di pemilihan benih unggul, pemupukan yang tepat, dan pengendalian gulma yang konsisten.',
    images: [
      'https://picsum.photos/200/150?random=11',
      'https://picsum.photos/200/150?random=12',
    ],
    likes: 156,
    comments: 15,
  },
];

// Data Komentar untuk setiap post
export const commentsData = {
  1: [
    {
      id: 1,
      author: 'Rina Susanti',
      avatar: 'https://i.pravatar.cc/150?img=5',
      time: '1 jam yang lalu',
      content:
        'Terima kasih infonya! Saya juga lagi menanam cabai dan kesulitan di musim hujan ini. Mulsa plastik sepertinya solusi yang bagus.',
    },
    {
      id: 2,
      author: 'Agus Salim',
      avatar: 'https://i.pravatar.cc/150?img=11',
      time: '45 menit yang lalu',
      content:
        'Pengalaman saya pakai varietas cabai keriting lebih tahan hujan. Drainase memang kunci utamanya.',
    },
    {
      id: 3,
      author: 'Linda Wijaya',
      avatar: 'https://i.pravatar.cc/150?img=12',
      time: '30 menit yang lalu',
      content:
        'Boleh minta rekomendasi varietas cabai yang cocok untuk musim hujan?',
    },
    {
      id: 4,
      author: 'Hendra Gunawan',
      avatar: 'https://i.pravatar.cc/150?img=13',
      time: '20 menit yang lalu',
      content:
        'Saya tambahkan kompos untuk memperbaiki drainase tanah. Hasilnya lumayan bagus.',
    },
    {
      id: 5,
      author: 'Dian Kartika',
      avatar: 'https://i.pravatar.cc/150?img=14',
      time: '10 menit yang lalu',
      content: 'Tips yang sangat bermanfaat! Langsung saya praktekkan.',
    },
  ],
  2: [
    {
      id: 1,
      author: 'Bambang Sutrisno',
      avatar: 'https://i.pravatar.cc/150?img=15',
      time: '4 jam yang lalu',
      content:
        'Pestisida organik memang lebih aman untuk lingkungan. Saya pakai ekstrak daun mimba dan sangat efektif.',
    },
    {
      id: 2,
      author: 'Sri Wahyuni',
      avatar: 'https://i.pravatar.cc/150?img=16',
      time: '3 jam yang lalu',
      content: 'Kalau untuk hama wereng, apa solusi organiknya ya?',
    },
    {
      id: 3,
      author: 'Eko Prasetyo',
      avatar: 'https://i.pravatar.cc/150?img=17',
      time: '2 jam yang lalu',
      content:
        'Rotasi tanaman dengan kacang-kacangan juga membantu mengurangi hama di lahan saya.',
    },
    {
      id: 4,
      author: 'Nurul Hidayah',
      avatar: 'https://i.pravatar.cc/150?img=18',
      time: '1 jam yang lalu',
      content: 'Terima kasih sharingnya! Sangat membantu petani seperti saya.',
    },
    {
      id: 5,
      author: 'Tono Sudarso',
      avatar: 'https://i.pravatar.cc/150?img=19',
      time: '45 menit yang lalu',
      content: 'Musuh alami yang paling efektif apa ya untuk hama padi?',
    },
    {
      id: 6,
      author: 'Maya Sari',
      avatar: 'https://i.pravatar.cc/150?img=20',
      time: '30 menit yang lalu',
      content:
        'Saya kombinasikan dengan perangkap cahaya untuk menangkap hama dewasa.',
    },
    {
      id: 7,
      author: 'Rudi Hartono',
      avatar: 'https://i.pravatar.cc/150?img=21',
      time: '20 menit yang lalu',
      content: 'Pengalaman yang sangat berharga. Ditunggu tips lainnya!',
    },
    {
      id: 8,
      author: 'Fitri Ayu',
      avatar: 'https://i.pravatar.cc/150?img=22',
      time: '5 menit yang lalu',
      content: 'Boleh tau dimana beli pestisida organiknya?',
    },
  ],
  3: [
    {
      id: 1,
      author: 'Supriyadi',
      avatar: 'https://i.pravatar.cc/150?img=23',
      time: '20 jam yang lalu',
      content:
        'Saya sudah 3 tahun pakai pupuk organik dan hasilnya tidak kalah dengan pupuk kimia. Malah tanah jadi lebih subur.',
    },
    {
      id: 2,
      author: 'Ani Rahmawati',
      avatar: 'https://i.pravatar.cc/150?img=24',
      time: '18 jam yang lalu',
      content:
        'Pupuk organik lebih lambat hasilnya tapi jangka panjang lebih bagus untuk tanah.',
    },
    {
      id: 3,
      author: 'Hendro Wibowo',
      avatar: 'https://i.pravatar.cc/150?img=25',
      time: '15 jam yang lalu',
      content: 'Saya kombinasikan keduanya dengan porsi 70% organik 30% kimia.',
    },
    {
      id: 4,
      author: 'Siska Amelia',
      avatar: 'https://i.pravatar.cc/150?img=26',
      time: '12 jam yang lalu',
      content: 'Pupuk organik bikin sayuran lebih enak dan sehat dikonsumsi.',
    },
    {
      id: 5,
      author: 'Wahyu Susanto',
      avatar: 'https://i.pravatar.cc/150?img=27',
      time: '10 jam yang lalu',
      content: 'Harga pupuk organik sekarang juga sudah lebih terjangkau.',
    },
    {
      id: 6,
      author: 'Lia Permata',
      avatar: 'https://i.pravatar.cc/150?img=28',
      time: '8 jam yang lalu',
      content:
        'Saya buat kompos sendiri dari limbah dapur dan hasil tanaman bagus sekali.',
    },
    {
      id: 7,
      author: 'Bima Sakti',
      avatar: 'https://i.pravatar.cc/150?img=29',
      time: '6 jam yang lalu',
      content: 'Untuk tanaman buah, organik memang lebih cocok ya?',
    },
    {
      id: 8,
      author: 'Ratna Dewi',
      avatar: 'https://i.pravatar.cc/150?img=30',
      time: '4 jam yang lalu',
      content: 'Pupuk kandang + pupuk hijau kombinasi terbaik menurut saya.',
    },
    {
      id: 9,
      author: 'Joko Santoso',
      avatar: 'https://i.pravatar.cc/150?img=31',
      time: '2 jam yang lalu',
      content: 'Transisi dari kimia ke organik butuh waktu berapa lama ya?',
    },
    {
      id: 10,
      author: 'Indah Sari',
      avatar: 'https://i.pravatar.cc/150?img=32',
      time: '1 jam yang lalu',
      content:
        'Makasih sharingnya, sangat membantu untuk pengambilan keputusan.',
    },
    {
      id: 11,
      author: 'Ridwan Ahmad',
      avatar: 'https://i.pravatar.cc/150?img=33',
      time: '45 menit yang lalu',
      content: 'Tanah jadi lebih gembur pakai organik, terbukti!',
    },
    {
      id: 12,
      author: 'Yuni Astuti',
      avatar: 'https://i.pravatar.cc/150?img=34',
      time: '15 menit yang lalu',
      content: 'Diskusi yang menarik, banyak insight baru!',
    },
  ],
  4: [
    {
      id: 1,
      author: 'Arif Rahman',
      avatar: 'https://i.pravatar.cc/150?img=35',
      time: '1 hari yang lalu',
      content:
        'Saya tertarik coba hidroponik tapi masih bingung mulai dari mana. Apa perlu modal besar?',
    },
    {
      id: 2,
      author: 'Putri Ayu',
      avatar: 'https://i.pravatar.cc/150?img=36',
      time: '1 hari yang lalu',
      content:
        'Sistem wick paling mudah untuk pemula dan modalnya tidak terlalu besar.',
    },
    {
      id: 3,
      author: 'Fajar Mahendra',
      avatar: 'https://i.pravatar.cc/150?img=37',
      time: '22 jam yang lalu',
      content: 'Nutrisi AB mix beli dimana ya yang kualitasnya bagus?',
    },
    {
      id: 4,
      author: 'Lestari Wulan',
      avatar: 'https://i.pravatar.cc/150?img=38',
      time: '20 jam yang lalu',
      content: 'Tomat hidroponik hasilnya memang lebih bersih dan seragam.',
    },
    {
      id: 5,
      author: 'Dodi Setiawan',
      avatar: 'https://i.pravatar.cc/150?img=39',
      time: '18 jam yang lalu',
      content:
        'Saya sudah 6 bulan hidroponik tomat, hasilnya sangat memuaskan!',
    },
    {
      id: 6,
      author: 'Mega Putri',
      avatar: 'https://i.pravatar.cc/150?img=40',
      time: '15 jam yang lalu',
      content: 'Boleh minta tips merawat pH air untuk sistem hidroponik?',
    },
  ],
  5: [
    {
      id: 1,
      author: 'Santoso Budi',
      avatar: 'https://i.pravatar.cc/150?img=41',
      time: '2 hari yang lalu',
      content: 'Selamat atas panennya! Varietas jagung manis apa yang ditanam?',
    },
    {
      id: 2,
      author: 'Wati Kusuma',
      avatar: 'https://i.pravatar.cc/150?img=42',
      time: '2 hari yang lalu',
      content: 'MasyaAllah hasilnya bagus sekali. Luas lahannya berapa hektar?',
    },
    {
      id: 3,
      author: 'Teguh Pramono',
      avatar: 'https://i.pravatar.cc/150?img=43',
      time: '2 hari yang lalu',
      content: 'Pengendalian gulmanya pakai apa? Manual atau herbisida?',
    },
    {
      id: 4,
      author: 'Rini Marlina',
      avatar: 'https://i.pravatar.cc/150?img=44',
      time: '2 hari yang lalu',
      content: 'Waktu tanam sampai panen berapa bulan pak?',
    },
    {
      id: 5,
      author: 'Yanto Saputra',
      avatar: 'https://i.pravatar.cc/150?img=45',
      time: '2 hari yang lalu',
      content: 'Pupuknya pakai apa saja dan kapan waktu pemberiannya?',
    },
    {
      id: 6,
      author: 'Dewi Laksmi',
      avatar: 'https://i.pravatar.cc/150?img=46',
      time: '1 hari yang lalu',
      content: 'Harga jualnya sekarang berapa per kg pak?',
    },
    {
      id: 7,
      author: 'Irfan Hakim',
      avatar: 'https://i.pravatar.cc/150?img=47',
      time: '1 hari yang lalu',
      content:
        'Alhamdulillah berkah ya pak. Semoga panen berikutnya lebih bagus lagi.',
    },
    {
      id: 8,
      author: 'Ayu Lestari',
      avatar: 'https://i.pravatar.cc/150?img=48',
      time: '1 hari yang lalu',
      content: 'Apa ada kendala hama penggerek batang?',
    },
    {
      id: 9,
      author: 'Bambang Edi',
      avatar: 'https://i.pravatar.cc/150?img=49',
      time: '1 hari yang lalu',
      content: 'Irigasinya pakai sistem apa pak?',
    },
    {
      id: 10,
      author: 'Sari Rahayu',
      avatar: 'https://i.pravatar.cc/150?img=50',
      time: '20 jam yang lalu',
      content: 'Terima kasih sharingnya pak, sangat menginspirasi!',
    },
    {
      id: 11,
      author: 'Hadi Wijaya',
      avatar: 'https://i.pravatar.cc/150?img=51',
      time: '18 jam yang lalu',
      content: 'Saya juga mau coba tanam jagung manis tahun depan.',
    },
    {
      id: 12,
      author: 'Nina Permata',
      avatar: 'https://i.pravatar.cc/150?img=52',
      time: '15 jam yang lalu',
      content: 'Benih unggul belinya dimana pak?',
    },
    {
      id: 13,
      author: 'Rudi Setiawan',
      avatar: 'https://i.pravatar.cc/150?img=53',
      time: '12 jam yang lalu',
      content: 'Pemasarannya kemana pak? Ke pasar atau ada yang beli langsung?',
    },
    {
      id: 14,
      author: 'Lina Marlinda',
      avatar: 'https://i.pravatar.cc/150?img=54',
      time: '10 jam yang lalu',
      content: 'Jagung manisnya manis banget pasti pak, sukses selalu!',
    },
    {
      id: 15,
      author: 'Ahmad Fauzi',
      avatar: 'https://i.pravatar.cc/150?img=55',
      time: '8 jam yang lalu',
      content: 'Barakallah pak, semoga jadi inspirasi petani lainnya.',
    },
  ],
};
