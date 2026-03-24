import styles from './PlaceholderImage.module.css'

export default function PlaceholderImage({ label, aspectRatio = '16/9', height }) {
  return (
    <div
      className={styles.placeholder}
      style={{
        aspectRatio: height ? undefined : aspectRatio,
        height: height || undefined,
      }}
    >
      <img
        src="/images/logos/logo-white.png"
        alt=""
        className={styles.watermark}
      />
      {/* {label && <span className={styles.label}>{label}</span>} */}
    </div>
  )
}
