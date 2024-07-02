// Uses the same styles as Product
import styles from "./Product.module.css";
import img from "../assets/img-2.jpg";
import PageNav from "../components/PageNav";
export default function Pricing() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </div>
        <img src={img} alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
