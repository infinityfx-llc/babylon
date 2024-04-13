import { Sorting } from "./types";

const countFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

export const formatCount = (val: any) => countFormatter.format(typeof val === 'number' ? val : 0);

export function getAuthorId(author: {
    fullName: string;
    born: string | Date;
    nationality: string;
}) {
    const decoded = `${author.nationality}-${author.fullName}-${new Date(author.born).toLocaleDateString('nl', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;

    return decoded.split('').map(char => Math.max(char.toUpperCase().charCodeAt(0) - 48, 0)).join('');
}

export function getAuthorNames({ firstName, lastName }: {
    firstName: string;
    lastName: string;
}) {

    return {
        name: `${firstName.split(' ').map(name => `${name.charAt(0)}. `).join('')} ${lastName}`,
        fullName: `${firstName} ${lastName}`
    };
}

export function getOrderBy(sorting?: keyof typeof Sorting) {
    let orderBy: {
        rating?: 'asc' | 'desc';
        published?: 'asc' | 'desc';
    } = { rating: 'desc' };

    switch (sorting) {
        case 'latest': orderBy = { published: 'desc' };
            break;
        case 'earliest': orderBy = { published: 'asc' };
            break;
        case 'highestRated': orderBy = { rating: 'desc' };
            break;
        case 'lowestRated': orderBy = { rating: 'asc' };
            break;
    }

    return orderBy;
}

export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
    });
}

export function resizeImage(file: File, w: number, h: number): Promise<string | null> {
    return new Promise(async (resolve) => {
        const canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            image = new Image();

        if (!context || file.type.slice(0, 5) !== 'image') return resolve(null);

        image.src = await fileToBase64(file);
        canvas.width = w;
        canvas.height = h;

        image.onload = () => {
            context.drawImage(image, 0, 0, w, h);

            resolve(canvas.toDataURL('image/jpeg'));
        }
    });
}