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