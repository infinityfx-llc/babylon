export class Validate<T extends { [key: string]: any; }> {

    errors: { [key in keyof T]?: string; } = {};
    private data: T;

    constructor(data: T) {
        this.data = data;
    }

    private set(strings: TemplateStringsArray, field: keyof T) {
        this.errors[field] = strings[0] + this.fieldName(field) + strings[1];

        return this;
    }

    private fieldName(field: string | number | symbol) {
        return field.toString()
            .replace(/([a-z])(?:(?:\-([a-z]))|([A-Z]))/g, '$1 $2')
            .split(/\s/g)
            .map(str => str.charAt(0).toUpperCase() + str.slice(1))
            .join(' ');
    }

    req(field: keyof T) {
        if (!this.data[field]) this.set`${field} is required.`;

        return this;
    }

    in(field: keyof T, map: object) {
        if (!(field in map)) this.set`${field} is invalid.`;

        return this;
    }

    do<K extends keyof T>(field: K, callback: (this: typeof this, value: T[K]) => string | void) {
        const error = callback.call(this, this.data[field]);

        if (error) this.errors[field] = error;

        return this;
    }

    mail(field: keyof T) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.data[field])) this.set`${field} is invalid`;

        return this;
    }

    pass(field: keyof T) {
        const value = this.data[field];

        if (value.length < 10) return this.set`${field} is less than 10 characters.`;
        if (!/[a-z]/.test(value)) return this.set`${field} does not contain a lowercase letter.`;
        if (!/[A-Z]/.test(value)) return this.set`${field} does not contain an uppercase letter.`;
        if (!/[0-9]/.test(value)) return this.set`${field} does not contain a number.`;
        if (!/[^a-zA-Z0-9]/.test(value)) return this.set`${field} does not contain a special character.`;

        return this;
    }

}