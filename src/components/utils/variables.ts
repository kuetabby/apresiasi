export const colors = {
    black: "#000000",
    white: "#ffffff",
    grey: "#f3f3f3",
    darkGrey: "#d2c7c7",
    blue: "#158cba",
    red: "#be1e2d",
    darkRed: "#991a26",
    pink: "#fae1e3",
    darkPink: "#f7cbcf",
    yellow: "#ffd165",
    green: "#3eb35d",
    darkGreen: "#39af19",
    brown: "#956f68"
}

export const space = {
    xxxs: 2,
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
}

export const breakpoints = ["0", "670px", "780px", "992px", "1200px", "1400px"]

export const mediaQueries = {
    xs: `@media screen and (min-width: ${breakpoints[0]})`,
    sm: `@media screen and (min-width: ${breakpoints[1]})`,
    md: `@media screen and (min-width: ${breakpoints[2]})`,
    lg: `@media screen and (min-width: ${breakpoints[3]})`,
    xl: `@media screen and (min-width: ${breakpoints[4]})`,
    xxl: `@media screen and (min-width: ${breakpoints[5]})`,
    smMax: `@media screen and (max-width: ${breakpoints[1]})`,
    mdMax: `@media screen and (max-width: ${breakpoints[2]})`,
    lgMax: `@media screen and (max-width: ${breakpoints[3]})`
}

export const widths = {
    md: 750,
    lg: 970,
    xl: 1140
}

export const shadows = {
    single: "0 4px 8px 0 rgba(0, 0, 0, 0.25)",
    double: "0 8px 16px 0 rgba(0, 0, 0, 0.25)",
    singleGreen: `0 4px 8px 0 ${colors.green}`,
    singleRed: `0 4px 8px 0 ${colors.red}`
}
