import { createContext, useContext, useId } from 'react'

export const LightboxContext = createContext(() => {})

export const photo = (name) => `${import.meta.env.BASE_URL}photos/${name}.jpg`

// Element that fades up when its slide appears; `i` sets the stagger order
export function A({ i = 0, className = '', children, as: Tag = 'div', style }) {
  return (
    <Tag className={`a ${className}`} style={{ '--i': i, ...style }}>
      {children}
    </Tag>
  )
}

export function Photo({ name, alt, caption, nums, className = '', position = 'center', i }) {
  const open = useContext(LightboxContext)
  return (
    <figure
      className={`photo ${i !== undefined ? 'a' : ''} ${className}`}
      style={i !== undefined ? { '--i': i } : undefined}
      onClick={() => open({ src: photo(name), caption: caption || alt })}
    >
      <img src={photo(name)} alt={alt} style={{ objectPosition: position }} draggable="false" />
      {nums && <span className="photo__num">№ {nums}</span>}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export function Tag({ children, light }) {
  return <span className={`tag ${light ? 'tag--light' : ''}`}>{children}</span>
}

// Greek key (meander) band
export function Meander({ className = '', color = 'currentColor', height = 28 }) {
  const id = `mq${useId().replace(/:/g, '')}`
  return (
    <svg className={`meander ${className}`} height={height} width="100%" aria-hidden="true">
      <defs>
        <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse" patternTransform={`scale(${height / 40})`}>
          <path
            d="M0 37 H40 M4 37 V3 H36 V29 H12 V11 H28 V21 H20"
            fill="none"
            stroke={color}
            strokeWidth="3.4"
            strokeLinecap="square"
          />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${id})`} />
    </svg>
  )
}

export function SlideNo({ n, total, light }) {
  return (
    <div className={`slide-no ${light ? 'slide-no--light' : ''}`}>
      <span>{String(n).padStart(2, '0')}</span>
      <i />
      <span>{String(total).padStart(2, '0')}</span>
    </div>
  )
}
