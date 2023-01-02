import { useEffect, useMemo } from "react"

import styles from "./app.module.scss"
import { NoticeEventType, Notice } from "./components/Notice"
import { startLegacyHandler } from "./legacyHandler"
import "../style/options.scss"

export const App = () => {
  useEffect(() => {
    startLegacyHandler()
  }, [])

  const noticeEvent = useMemo(() => {
    const query = new URLSearchParams(window.location.search)
    return query.get("event")
  }, [])

  return (
    <div className={styles.root}>
      {noticeEvent && NoticeEventType.is(noticeEvent) && (
        <Notice event={noticeEvent} />
      )}
      <header>
        <section>
          <h1>
            <img src="./icons/icon.svg" alt="logo" className="logo" />
            <div className="logotype">
              <p>manaba Enhanced</p>
            </div>
          </h1>
          <div className="store">
            <a
              href="https://chrome.google.com/webstore/detail/manaba-enhanced-for-tsuku/fldngcbchlbfgbccilklplmhljilhfch"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="256" cy="256" r="85" />
                <path d="M143.655 231.412C154.947 179.777 201.026 141 256 141h228.861c-12.143-24.107-28.2-46.378-47.841-66.02C388.667 26.629 324.38 0 256 0S123.333 26.629 74.98 74.98a261.02 261.02 0 00-13.337 14.384z" />
                <path d="M290.88 365.587A114.583 114.583 0 01256 371c-42.718 0-80.068-23.414-99.898-58.082a15.462 15.462 0 01-.415-.665L42.011 115.36C14.681 156.76 0 205.25 0 256c0 68.38 26.629 132.667 74.98 181.02 37.043 37.042 83.443 61.316 133.866 70.654z" />
                <path d="M333.379 171C356.48 192.048 371 222.36 371 256c0 21.158-5.75 40.995-15.76 58.044-.102.196-.19.395-.301.588l-113.7 196.936c4.897.276 9.817.432 14.761.432 68.38 0 132.667-26.629 181.02-74.98C485.371 388.667 512 324.38 512 256c0-29.406-4.938-58.05-14.396-85z" />
              </svg>
              <p>Chrome Web Store</p>
            </a>
          </div>
          <div className="store">
            <a
              href="https://github.com/manaba-enhanced-for-tsukuba/dist-firefox"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.824 7.287c.008 0 .004 0 0 0zm-2.8-1.4c.006 0 .003 0 0 0zm16.754 2.161c-.505-1.215-1.53-2.528-2.333-2.943.654 1.283 1.033 2.57 1.177 3.53l.002.02c-1.314-3.278-3.544-4.6-5.366-7.477-.091-.147-.184-.292-.273-.446a3.545 3.545 0 0 1-.13-.24 2.118 2.118 0 0 1-.172-.46.03.03 0 0 0-.027-.03.038.038 0 0 0-.021 0l-.006.001a.037.037 0 0 0-.01.005L15.624 0c-2.585 1.515-3.657 4.168-3.932 5.856a6.197 6.197 0 0 0-2.305.587.297.297 0 0 0-.147.37c.057.162.24.24.396.17a5.622 5.622 0 0 1 2.008-.523l.067-.005a5.847 5.847 0 0 1 1.957.222l.095.03a5.816 5.816 0 0 1 .616.228c.08.036.16.073.238.112l.107.055a5.835 5.835 0 0 1 .368.211 5.953 5.953 0 0 1 2.034 2.104c-.62-.437-1.733-.868-2.803-.681 4.183 2.09 3.06 9.292-2.737 9.02a5.164 5.164 0 0 1-1.513-.292 4.42 4.42 0 0 1-.538-.232c-1.42-.735-2.593-2.121-2.74-3.806 0 0 .537-2 3.845-2 .357 0 1.38-.998 1.398-1.287-.005-.095-2.029-.9-2.817-1.677-.422-.416-.622-.616-.8-.767a3.47 3.47 0 0 0-.301-.227 5.388 5.388 0 0 1-.032-2.842c-1.195.544-2.124 1.403-2.8 2.163h-.006c-.46-.584-.428-2.51-.402-2.913-.006-.025-.343.176-.389.206a8.43 8.43 0 0 0-1.136.974c-.397.403-.76.839-1.085 1.303a9.816 9.816 0 0 0-1.562 3.52c-.003.013-.11.487-.19 1.073-.013.09-.026.181-.037.272a7.8 7.8 0 0 0-.069.667l-.002.034-.023.387-.001.06C.386 18.795 5.593 24 12.016 24c5.752 0 10.527-4.176 11.463-9.661.02-.149.035-.298.052-.448.232-1.994-.025-4.09-.753-5.844z" />
              </svg>
              <p>Firefox Add-on</p>
            </a>
          </div>
          <div className="version">
            <p className="bold" id="version-number"></p>
            <a
              href="https://github.com/mkobayashime/manaba-enhanced"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg aria-hidden="true" focusable="false" viewBox="0 0 496 512">
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
              </svg>
              <p>GitHub</p>
            </a>
          </div>
          <div className="maintainer">
            <p className="bold">Maintainer</p>
            <a
              href="https://twitter.com/mkobayashime"
              target="_blank"
              rel="noopener noreferrer"
              className="maintainer"
            >
              <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512">
                <path
                  fill="currentColor"
                  d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                ></path>
              </svg>
              <p>Masaki Kobayashi</p>
            </a>
          </div>
        </section>
      </header>
      <main>
        <section className="section-features">
          <h2>Enabled Features</h2>
          <ul className="features">
            <li>
              <label
                className="checkboxLabel"
                htmlFor="featuresAssignmentsColoring"
              >
                Assignments coloring
              </label>
              <div className="checkbox">
                <input
                  type="checkbox"
                  defaultChecked
                  id="featuresAssignmentsColoring"
                  className="checkbox-features"
                />
                <div className="checkbox-style" />
              </div>
            </li>
            <li>
              <label
                className="checkboxLabel"
                htmlFor="featuresAutoSaveReports"
              >
                Autosave reports
              </label>
              <div className="checkbox">
                <input
                  type="checkbox"
                  defaultChecked
                  id="featuresAutoSaveReports"
                  className="checkbox-features"
                />
                <div className="checkbox-style" />
              </div>
            </li>
            <li>
              <label
                className="checkboxLabel"
                htmlFor="featuresDeadlineHighlighting"
              >
                Deadline highlighting
              </label>
              <div className="checkbox">
                <input
                  type="checkbox"
                  defaultChecked
                  id="featuresDeadlineHighlighting"
                  className="checkbox-features"
                />
                <div className="checkbox-style" />
              </div>
            </li>
            <li>
              <label
                className="checkboxLabel"
                htmlFor="featuresRemoveConfirmation"
              >
                Remove confirmation of external links
              </label>
              <div className="checkbox">
                <input
                  type="checkbox"
                  defaultChecked
                  id="featuresRemoveConfirmation"
                  className="checkbox-features"
                />
                <div className="checkbox-style" />
              </div>
            </li>
            <li>
              <label className="checkboxLabel" htmlFor="featuresFilterCourses">
                Courses filtering
              </label>
              <div className="checkbox">
                <input
                  type="checkbox"
                  defaultChecked
                  id="featuresFilterCourses"
                  className="checkbox-features"
                />
                <div className="checkbox-style" />
              </div>
            </li>
            <li>
              <label className="checkboxLabel" htmlFor="featuresDragAndDrop">
                Drag & drop file uploads
              </label>
              <div className="checkbox">
                <input
                  type="checkbox"
                  defaultChecked
                  id="featuresDragAndDrop"
                  className="checkbox-features"
                />
                <div className="checkbox-style" />
              </div>
            </li>
            <li>
              <label
                className="checkboxLabel"
                htmlFor="featuresDisableForceFileSaving"
              >
                Open supported files like PDF without saving
              </label>
              <div className="checkbox">
                <input
                  type="checkbox"
                  defaultChecked
                  id="featuresDisableForceFileSaving"
                  className="checkbox-features"
                />
                <div className="checkbox-style" />
              </div>
            </li>
            <li>
              <label className="checkboxLabel" htmlFor="featuresReportTemplate">
                Generate LaTeX template for reports
              </label>
              <div className="checkbox">
                <input
                  type="checkbox"
                  defaultChecked
                  id="featuresReportTemplate"
                  className="checkbox-features"
                />
                <div className="checkbox-style" />
              </div>
            </li>
            <li>
              <label
                className="checkboxLabel"
                htmlFor="featuresRelativeGradesPosition"
              >
                Display the relative position of the grades in courses
              </label>
              <div className="checkbox">
                <input
                  type="checkbox"
                  defaultChecked
                  id="featuresRelativeGradesPosition"
                  className="checkbox-features"
                />
                <div className="checkbox-style" />
              </div>
            </li>
          </ul>
        </section>
        <section className="section-keys">
          <h2>Shortcuts</h2>
          <p>
            Shortcuts are customizable{" "}
            <a href="" id="link-to-shortcuts-settings">
              here
            </a>
          </p>
        </section>
        <section className="section-keys section-report-template-preferences">
          <h2>Report template</h2>
          <form id="save-report-template" method="post">
            <p>
              You can set your favorite LaTeX template and its filename here.
              Report templates are downloadable on the manaba report page.
            </p>
            <div className="input-wrapper">
              <label htmlFor="report-template">LaTeX document</label>
              <small>
                You can insert the report attributes into the template:{" "}
                <code>{"{{course-name}}"}</code>, <code>{"{{deadline}}"}</code>,{" "}
                <code>{"{{description}}"}</code>,{" "}
                <code>{"{{report-title}}"}</code> and{" "}
                <code>{"{{student-name}}"}</code> by only writing them like "{" "}
                <code>\title{"{{{course-name}}}"}</code>". If nothing is
                specified, we use the default template.
              </small>
              <textarea
                name="report-template"
                id="report-template"
                rows={10}
              ></textarea>
            </div>
            <div className="input-wrapper">
              <label htmlFor="report-filename">Filename</label>
              <small>
                You can insert the report attributes into the filename:{" "}
                <code>{"{{course-name}}"}</code>, <code>{"{{deadline}}"}</code>,{" "}
                <code>{"{{description}}"}</code>,{" "}
                <code>{"{{report-title}}"}</code> and{" "}
                <code>{"{{student-name}}"}</code> by only writing them like "
                <code>{"{{course-name}}"}.tex</code>". If nothing is specified,
                we use the default filename.
              </small>
              <textarea
                name="report-filename"
                id="report-filename"
                rows={1}
              ></textarea>
            </div>
            <input type="submit" value="Save" />
          </form>
        </section>
        <section className="section-disclaimer">
          <h2>Disclaimer</h2>
          <p>
            This is an unofficial software and has nothing to do with the
            administration of the University of Tsukuba. We will not be held
            responsible for any damages and troubles caused by this extension.
          </p>
        </section>
        <section className="section-release-note">
          <h2>3.3.0</h2>
          <p>Display the relative position of the grades in the courses</p>
          <p>Shortcut key for opening assignments page can be set</p>
          <h2>3.2.0</h2>
          <p>Customizable report template</p>
          <p>Publish Firefox version officially</p>
          <h2>3.1.0</h2>
          <p>Generate LaTeX template for reports</p>
          <h2>2.9.0</h2>
          <p>Submit usermemo with Ctrl+Enter / Meta+Enter shortcut</p>
          <h2>2.8.0</h2>
          <p>Supported files can be opened in browser without saving</p>
          <h2>2.7.0</h2>
          <p>Drag & Drop file uploads</p>
          <h2>2.6.0</h2>
          <p>manaba Enhanced is now written in TypeScript</p>
          <p>Stability improvements in course filtering</p>
          <a
            href="https://github.com/mkobayashime/manaba-enhanced/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="older"
          >
            Older versions
          </a>
        </section>
      </main>
    </div>
  )
}
