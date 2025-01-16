export class Formatter {
    public static currency(value: number): string {
        if (value === 0) {
            return 'No disponible';
        }

        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }
}