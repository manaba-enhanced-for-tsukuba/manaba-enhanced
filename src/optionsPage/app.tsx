import { useEffect, useMemo } from "react"

import styles from "./app.module.scss"
import { Header } from "./components/Header"
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
      <Header />
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
