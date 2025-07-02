# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# DrawPitch Component

## ✨ Purpose

`DrawPitch` is a reusable and customizable React component for rendering a scalable football pitch (soccer field) using SVG. It supports horizontal and vertical orientations, real-world proportions, customizable styling, and dynamic child layers like team formations or heatmaps.

---

## 🌍 Geometry and Scaling

The pitch is based on standard FIFA dimensions:

- **TOUCH_LINE (length)**: 105 meters
- **GOAL_LINE (width)**: 68 meters

These are scaled to fit the `width` and `height` props using internal scale factors:

```js
scaleWidth = width / 105;
scaleHeight = height / 68;
```

Every field element (goal, penalty box, arcs, etc.) is then scaled accordingly.

Orientation affects axis alignment:

- **Horizontal**: Length runs left to right
- **Vertical**: Length runs top to bottom

The pitch elements are organized into structured objects per orientation.

---

## ⚖️ Props

| Prop            | Type          | Default        | Description                                                   |
| --------------- | ------------- | -------------- | ------------------------------------------------------------- |
| `width`         | number/string | `800`          | Total SVG width in pixels                                     |
| `height`        | number/string | `500`          | Total SVG height in pixels                                    |
| `orientation`   | string        | `"horizontal"` | Orientation of pitch (`"horizontal"` or `"vertical"`)         |
| `grassColor`    | string        | `"#007A57"`    | Pitch background color                                        |
| `lineColor`     | string        | `"#fff"`       | Line color for field markings                                 |
| `lineWidth`     | number        | `1`            | Thickness of lines                                            |
| `goalPostColor` | string        | `"#fff"`       | Fill color for goal posts                                     |
| `cornerR`       | number        | `1`            | Corner arc stroke width                                       |
| `children`      | ReactNode     | `null`         | Additional layers (e.g. formations, heatmaps) rendered on top |

---

## 🔍 Features

- SVG-based rendering
- Responsive geometry using scale ratios
- Orientation-aware rendering logic
- Built-in half and full pitch logic
- Supports overlays like:

  - `TeamFormationLayer`
  - `HeatmapLayer`
  - Custom SVG overlays

- Provides pitch context to children using `PitchContext`

---

## 🔹 Usage Example

```jsx
import DrawPitch from "./components/DrawPitch/DrawPitch";
import TeamFormation from "./components/layers/TeamFormation/TeamFormationLayer";

<DrawPitch width={800} height={500} orientation="horizontal">
  <TeamFormation formation="4-3-3" isHomeTeam={true} />
  <TeamFormation formation="4-4-2" isHomeTeam={false} color="#FF4444" />
</DrawPitch>;
```

---

## ⚖️ Pitch Context API

The `DrawPitch` component provides the following values through `PitchContext`:

```js
{
  width, // Width in px
    height, // Height in px
    orientation, // "horizontal" or "vertical"
    axisX, // Width depending on orientation
    axisY, // Height depending on orientation
    scalePitch; // Scaled pitch element sizes
}
```

You can access this inside any child component:

```js
const { width, height, orientation } = useContext(PitchContext);
```

---

## ⚠️ Tips

- Always wrap custom SVG layers inside `DrawPitch`
- Use `orientation` to conditionally flip layout logic
- Use pitch context values to calculate player or heatmap positions
- Keep proportions realistic by using standard field values

---


# TeamFormationLayer

## 📝 Overview

`TeamFormationLayer` is a React component that renders a football team's formation on an SVG pitch using context provided by `DrawPitch`. It supports flexible geometry, automatic orientation handling, and multiple display modes (half pitch or full pitch).

---

## ⚙️ Geometry System

The football pitch is divided into logical **zones**, each representing one line in the formation (e.g. goalkeeper, defenders, midfielders, forwards).

### How it Works:

- The pitch is split horizontally or vertically based on orientation.
- `zoneX` defines the width of each formation column.
- Vertical spacing is automatically calculated to avoid overlapping.
- Positioning (cx/cy) is orientation-aware and uses the pitch dimensions from context.

### Geometry Formulae:

```js
const cx = zoneX * i + zoneX / 2 - radius + offsetX;
const cy = spacing * (j + 1) + j * diameter + radius;
```

Where `offsetX = 0` for home team on half pitch and `offsetX = axisX` for away team.

---

## 📞 Props

| Prop                   | Type      | Default     | Description                                                   |
| ---------------------- | --------- | ----------- | ------------------------------------------------------------- |
| `formation`            | `string`  | `"4-3-3"`   | Formation string (GK added automatically).                    |
| `isHomeTeam`           | `boolean` | `true`      | Renders team on left/top (home) or right/bottom (away).       |
| `fullPitch`            | `boolean` | `false`     | Whether to render formation across the full pitch.            |
| `color`                | `string`  | `"#FF4444"` | Player circle fill color. Defaults to red/blue based on team. |
| `radius`               | `number`  | `8`         | Radius of each player circle.                                 |
| `verticalSpacingRatio` | `number`  | `1.5`       | Controls vertical distance between players.                   |

---

## ✍️ Usage Example

```jsx
import DrawPitch from "./DrawPitch";
import TeamFormationLayer from "./layers/TeamFormationLayer";

<DrawPitch width={800} height={500} orientation="horizontal">
  <TeamFormationLayer
    formation="4-3-3"
    isHomeTeam={true}
    color="#3366FF"
    radius={10}
  />
  <TeamFormationLayer
    formation="4-4-2"
    isHomeTeam={false}
    color="#FF5555"
    fullPitch={false}
  />
</DrawPitch>;
```

### Full-Pitch Example:

```jsx
<DrawPitch width={800} height={500} orientation="vertical">
  <TeamFormationLayer formation="3-5-2" isHomeTeam={true} fullPitch={true} />
  <TeamFormationLayer formation="4-3-3" isHomeTeam={false} fullPitch={true} />
</DrawPitch>
```

---

## 🧠 Best Practices

- Always place `TeamFormationLayer` **inside `DrawPitch`**, which provides essential pitch geometry via React Context.
- Adjust `verticalSpacingRatio` for visual spacing tuning.
- Use `fullPitch={true}` only when both teams are shown on the field.
- The component auto-adjusts to `horizontal` or `vertical` orientation.

---

## 📄 Related Utilities

- `calculateTotalPlayerFromFormation` — parses the formation string (e.g. "4-3-3") into `[1, 4, 3, 3]`
- `calculatePitchSize` — computes pitch zone sizes and axis based on props and orientation.
- `PitchContext` — context provider from `DrawPitch` that shares pitch size and settings.

---

## 📈 Debug Tips

- Use `console.log(players)` inside the loop to inspect circle coordinates.
- Use `color` props to distinguish multiple teams.
- Orientation issues? Double-check `orientation` and inspect flipped `cx/cy` logic.

---

Enjoy visualizing dynamic football formations!
