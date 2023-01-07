import styles from "./index.module.scss"

const versions: Array<
  Readonly<{
    version: string
    descriptions: string[]
  }>
> = [
  {
    version: "3.3.0",
    descriptions: [
      "Display the relative position of the grades in the courses",
      "Shortcut key for opening assignments page can be set",
    ],
  },
  {
    version: "3.2.0",
    descriptions: [
      "Customizable report template",
      "Publish Firefox version officially",
    ],
  },
  {
    version: "3.1.0",
    descriptions: ["Generate LaTeX template for reports"],
  },
  {
    version: "2.9.0",
    descriptions: ["Submit usermemo with Ctrl+Enter / Meta+Enter shortcut"],
  },
  {
    version: "2.8.0",
    descriptions: ["Supported files can be opened in browser without saving"],
  },
  {
    version: "2.7.0",
    descriptions: ["Drag & Drop file uploads"],
  },
  {
    version: "2.6.0",
    descriptions: [
      "manaba Enhanced is now written in TypeScript",
      "Stability improvements in course filtering",
    ],
  },
]

export const ReleaseNote = () => (
  <section className={styles.wrapper}>
    {versions.map(({ version, descriptions }) => (
      <div key={version} className={styles.versionWrapper}>
        <h2 className={styles.versionNumber}>{version}</h2>
        {descriptions.map((str, index) => (
          <p key={index} className={styles.descriptionLine}>
            {str}
          </p>
        ))}
      </div>
    ))}
    <a
      href="https://github.com/mkobayashime/manaba-enhanced/releases"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.older}
    >
      Older versions
    </a>
  </section>
)
