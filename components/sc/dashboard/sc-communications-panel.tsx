import {
  IconComment,
  IconEye,
  IconForumDoc,
  IconInfo,
  IconKebab,
} from "@/components/sc/sc-icons";
import { SC_DASHBOARD } from "@/lib/demo/dashboard/amazon-data";

export function ScCommunicationsPanel() {
  return (
    <section className="sc-white-card">
      <div className="sc-panel-head">
        <div className="sc-panel-head-left">
          <h2 className="sc-panel-title">Communications</h2>
          <button type="button" className="sc-info-btn" aria-label="Info">
            <IconInfo />
          </button>
        </div>
      </div>

      <div style={{ padding: "14px 16px", borderBottom: "1px solid #e7e7e7" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 className="sc-section-label">Seller Forums</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button type="button" className="sc-link" style={{ fontSize: 13 }}>
              See All
            </button>
            <button type="button" className="sc-kebab-btn" aria-label="More">
              <IconKebab />
            </button>
          </div>
        </div>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {SC_DASHBOARD.forums.map((post) => (
            <li key={post.id} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <IconForumDoc />
              <div style={{ minWidth: 0 }}>
                <button type="button" className="sc-link" style={{ fontSize: 13, lineHeight: 1.35 }}>
                  {post.title}
                </button>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    marginTop: 4,
                    fontSize: 12,
                    color: "#565959",
                    alignItems: "center",
                  }}
                >
                  <span>{post.date}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <IconEye /> {post.views}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <IconComment /> {post.comments}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 className="sc-section-label">Seller News</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button type="button" className="sc-link" style={{ fontSize: 13 }}>
              See All
            </button>
            <button type="button" className="sc-kebab-btn" aria-label="More">
              <IconKebab />
            </button>
          </div>
        </div>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {SC_DASHBOARD.news.map((item) => (
            <li key={item.id} style={{ marginBottom: 18 }}>
              <button type="button" className="sc-link" style={{ fontSize: 13, lineHeight: 1.35, fontWeight: 400 }}>
                {item.title}
              </button>
              <p style={{ margin: "4px 0 0", fontSize: 12, lineHeight: 1.45, color: "#0f1111" }}>{item.body}</p>
              <button type="button" className="sc-link" style={{ fontSize: 12, marginTop: 4 }}>
                Read More &gt;
              </button>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "#c45500" }}>{item.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
