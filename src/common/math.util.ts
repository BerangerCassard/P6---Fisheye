export class MathUtil {

    /**
     * Returns Random value before provided limits
     * @param min Min value
     * @param max Max value
     */
    public static randomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
