const data: Book[] = [
    {
        id: 'tolkien-the-lord-of-the-rings-1954',
        releaseDate: new Date('1954-01-01'),
        pages: 1216,
        language: 'en',
        title: 'The Lord of the Rings',
        author: {
            name: 'J.R.R. Tolkien'
        },
        genre: {
            id: 'fantasy',
            name: 'Fantasy'
        },
        rating: {
            value: 10,
            count: 69
        },
        description: "One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell by chance into the hands of the hobbit Bilbo Baggins. From Sauron's fastness in the Dark Tower of Mordor, his power spread far and wide. Sauron gathered all the Great Rings to him, but always he searched for the One Ring that would complete his dominion. When Bilbo reached his eleventy-first birthday he disappeared, bequeathing to his young cousin Frodo the Ruling Ring and a perilous quest: to journey across Middle-earth, deep into the shadow of the Dark Lord, and destroy the Ring by casting it into the Cracks of Doom. The Lord of the Rings tells of the great quest undertaken by Frodo and the Fellowship of the Ring: Gandalf the Wizard; the hobbits Merry, Pippin, and Sam; Gimli the Dwarf; Legolas the Elf; Boromir of Gondor; and a tall, mysterious stranger called Strider."
    },
    {
        id: 'lewis-the-chronicles-of-narnia-1956',
        releaseDate: new Date('1956-01-01'),
        pages: 767,
        language: 'en',
        title: 'The Chronicles of Narnia',
        author: {
            name: 'C.S. Lewis'
        },
        genre: {
            id: 'fantasy',
            name: 'Fantasy'
        },
        rating: {
            value: 9.5,
            count: 420
        },
        description: "Journeys to the end of the world, fantastic creatures, and epic battles between good and evil—what more could any reader ask for in one book? The book that has it all is The Lion, the Witch and the Wardrobe, written in 1949 by Clive Staples Lewis. But Lewis did not stop there. Six more books followed, and together they became known as The Chronicles of Narnia. For the past fifty years, The Chronicles of Narnia have transcended the fantasy genre to become part of the canon of classic literature. Each of the seven books is a masterpiece, drawing the reader into a land where magic meets reality, and the result is a fictional world whose scope has fascinated generations. This edition presents all seven books—unabridged—in one impressive volume. The books are presented here in chronlogical order, each chapter graced with an illustration by the original artist, Pauline Baynes. Deceptively simple and direct, The Chronicles of Narnia continue to captivate fans with adventures, characters, and truths that speak to readers of all ages, even fifty years after they were first published."
    }
];

export function getAll() {
    return new Array(6).fill(data).flat();
}

export function getById(id: string) {
    return data.find(book => book.id === id);
}