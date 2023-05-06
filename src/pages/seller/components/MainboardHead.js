import productStyle from "@/styles/productsPage.module.css";

const MainboardHead = ({ h4Text, h6Text }) => {
  return (
      <>
          <div className={productStyle.pageHeader}>
              <h4>{h4Text}</h4>
              <h6>{h6Text}</h6>
          </div>
      </>
  );
}

export default MainboardHead;
