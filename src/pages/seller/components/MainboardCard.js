import cardStyle from "@/styles/mainBoardCard.module.css";

const MainboardCard = (props) => {
  return (
      <>
          <div className={"row " + cardStyle.dashWidget} style={{
              backgroundColor: props.bgColor,
              color: "#fff"
          }}>
              <div className={"col-md-4 " + cardStyle.dashWidgetimg}>
                  <span>
                      <i className={"fa " + props.imageSrc}></i>
                  </span>
              </div>
              <div className={"col-md-8 " + cardStyle.dashWidgetcontent}>
                  <h5>
                    <span className={cardStyle.counters} data-count={props.totalAmount}>
                            &nbsp; {props.totalAmount}
                        </span>
                  </h5>
              </div>
              <h6 className={"mt-2"}>{props.titleText}</h6>
          </div>
      </>
  );
}

export default MainboardCard;
