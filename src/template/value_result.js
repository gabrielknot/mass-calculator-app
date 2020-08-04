export function value_result(waist, neck, hip, height) {
    var result = (495/(1.03224-0.19077*(Math.log10(waist+hip-neck)) + 0.15566*(Math.log10(
            height
        ))) - 450 )+3
    return result
}