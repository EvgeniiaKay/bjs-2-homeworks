function parseCount(parsingResult) {
    const parsed = Number.parseFloat(parsingResult);
    if (isNaN(parsed)) {
        throw new Error("Невалидное значение");
    }
    return parsed;
}

function validateCount(parsingResult) {
    try {
        return parseCount(parsingResult);
    } catch (error) {
        return error;
    }
}



class Triangle {
    constructor(a, b, c) {

        if (typeof a !== "number" || typeof b !== "number" || typeof c !== "number" || a <= 0 || b <= 0 || c <= 0) {
            throw new Error("Треугольник с такими сторонами не существует");
        }

        if (a + b <= c || a + c <= b || b + c <= a) {
            throw new Error("Треугольник с такими сторонами не существует");
        }

        this.a = a;
        this.b = b;
        this.c = c;
    }

    get perimeter() {
        return this.a + this.b + this.c;
    }

    get area() {
        const p = (this.a + this.b + this.c) / 2;
        const area = Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
        return Number(area.toFixed(3));
    }
}

function getTriangle(a, b, c) {
    try {
        return new Triangle(a, b, c);
    } catch(error) {
        return {
            get area() {
                return "Ошибка! Треугольник не существует";
            },
            get perimeter() {
                return "Ошибка! Треугольник не существует";
            }
        }
    }
}