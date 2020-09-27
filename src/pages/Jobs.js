import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  Link,
  Grow,
  Dialog,
  IconButton,
  DialogContent,
  DialogActions,
  CircularProgress,
  Button,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import styles from "../Styles/jobs.module.scss";
import Firebase from "../Services/firebase";
import DateCorrector from "../Services/DateCorrector";
import { UserContext } from "../Services/UserContext";
import EditIcon from "@material-ui/icons/Edit";
import NewJob from "../components/jobs/NewJob";

function Jobs() {
  //#region States
  const currentUser = useContext(UserContext);
  const [_loadingJobs, set_loadingJobs] = useState(false);
  const [_openDialog, set_openDialog] = useState(false);
  const [_jobsList, set_jobsList] = useState([]);
  const [_selectedJob, set_selectedJob] = useState(null);
  const [_openEditDialog, set_openEditDialog] = useState({
    open: false,
    value: null,
  });
  //#endregion
  //----------------------------------
  //#region Functions
  function GetJobsList() {
    set_loadingJobs(true);
    console.log("Firebase.GET_All_JOBS");

    Firebase.GET_All_JOBS()
      .then((res) => {
        set_jobsList(res);
        set_loadingJobs(false);
      })
      .catch((err) => {
        alert(err);
      });
  }
  function HandelOpenDialog(job) {
    job.views = job.views + 1;
    set_selectedJob(job);
    set_openDialog(true);
    Firebase.UPDATE_JOBS({ views: job.views }, job.id)
      .then(() => console.log("update views"))
      .catch((err) => console.log("error update views", err));
  }
  function handleClickOpenNewJob() {
    set_openEditDialog({ open: true, value: null });
  }
  function handleClickOpenEditJob(job) {
    set_openEditDialog({ open: true, value: job });
  }
  function HandelCloseDialog() {
    set_openDialog(false);
  }
  //#endregion
  //----------------------------------
  //#region Functional Components
  const JobDetails = ({ job, open, handelClose }) => {
    function handelConnect() {
      window.open(
        `https://api.whatsapp.com/send?phone=${job.customer.whatsapp}&text=هل يمكن أن أستفسر عن فرصة العمل؟`
      );
    }

    if (job != null) {
      return (
        <React.Fragment>
          <Dialog open={open} onClose={handelClose}>
            <DialogContent style={{ textAlign: "right" }}>
              <h2>
                {job.title}
                <br />
                <span style={{ fontSize: "15px", color: "gray" }}>
                  {job.customer.name}
                </span>
              </h2>
              <strong>التاريخ:</strong>{" "}
              <span> {DateCorrector(job.date.toDate())}</span>
              <br />
              <strong>العنوان:</strong>
              <span>
                {job.customer.country} - {job.customer.area}
              </span>
              <br />
              <strong>الخبرة:</strong> <span> {job.experience}</span>
              <br />
              <strong>الدوام:</strong> <span> {job.shift}</span>
              <br />
              <strong>التواصل:</strong> <span> {job.customer.mobile}</span>
              <p>{job.description}</p>
              <br />
            </DialogContent>
            <DialogActions>
              <IconButton onClick={handelConnect}>
                <WhatsAppIcon fontSize="large" />
              </IconButton>
              <IconButton onClick={handelClose}>
                <CancelOutlinedIcon fontSize="large" />
              </IconButton>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
    } else return null;
  };
  const JobCard = ({ timeout, row, titleClick, editClick }) => {
    const currentUser = useContext(UserContext);
    console.info(">>>>> Job Card <<<<<");
    return (
      <Grow
        in={true}
        style={{ transformOrigin: "0 0 0" }}
        {...(true ? { timeout: timeout } : {})}
        key={row.id}
      >
        <Card className={styles.card} key={row.id} dir="rtl" variant="outlined">
          <CardHeader
            className={styles.cardHeader}
            action={
              currentUser ? (
                <IconButton onClick={editClick}>
                  <EditIcon />
                </IconButton>
              ) : (
                <></>
              )
            }
            title={
              <Link
                style={{
                  fontFamily: "Tajawal",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
                color="textPrimary"
                component="button"
                underline="none"
                className={styles.title}
                onClick={titleClick}
              >
                {row.title}
              </Link>
            }
            subheader={
              <>
                <span style={{ fontFamily: "Tajawal" }}>
                  {DateCorrector(row.date.toDate())}
                </span>
                <br />
                <span style={{ fontFamily: "Tajawal" }}>
                  {row.customer.country} - {row.customer.area}
                </span>
                <br />
                <Button
                  disabled
                  size="small"
                  variant="outlined"
                  style={{ marginTop: "10px" }}
                >
                  <VisibilityIcon />
                  <span style={{ paddingRight: "10px" }}> {row.views}</span>
                </Button>
              </>
            }
          />
        </Card>
      </Grow>
    );
  };
  //#endregion

  useEffect(() => {
    // pushInvoices();
    GetJobsList();
  }, []);

  let tt = 1000;

  return (
    <div>
      {currentUser ? (
        <>
          <Button onClick={handleClickOpenNewJob} variant="outlined">
            اضافة فرصة عمل
          </Button>
          <NewJob
            value={_openEditDialog.value}
            open={_openEditDialog.open}
            close={() =>
              set_openEditDialog({ ..._openEditDialog, open: false })
            }
          />
        </>
      ) : null}
      <br />
      <span>لإضافة فرصة عمل يرجى التواصل معنا على </span>
      <Link href="https://wa.me/963943444596">الوتساب</Link>
      <br />
      0943444596
      <br />
      <br />
      <JobDetails
        job={_selectedJob}
        open={_openDialog}
        handelClose={HandelCloseDialog}
      />
      {_loadingJobs ? (
        <CircularProgress />
      ) : _jobsList.length > 0 ? (
        _jobsList
          .sort(function (x, y) {
            return y.date - x.date;
          })
          .map((row) => {
            tt = Number(tt) + 1000;
            return (
              <JobCard
                key={row.id}
                timeout={tt}
                id={row.id}
                row={row}
                titleClick={() => HandelOpenDialog(row)}
                editClick={() => handleClickOpenEditJob(row)}
              />
            );
          })
      ) : (
        <h2>لا يوجد فرص عمل متاحة في الوقت الحالي</h2>
      )}
      {}
    </div>
  );
}

export default Jobs;
