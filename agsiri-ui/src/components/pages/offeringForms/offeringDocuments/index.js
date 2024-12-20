import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Modal, IconButton } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid2";
import { documentLabels } from "@/constValues/constValues";
import { uploadDocuments } from "@/utils/postData";
import { BASE_URL } from "@/config/apiBaseUrls";

const OfferingDocuments = ({
  offeringDetails,
  documentsDetails,
  review,
  setActiveTab,
  offeringId,
  getOfferingData
}) => {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentUploading, setDocumentUploading] = useState(false);

  useEffect(() => {
    if (documentsDetails) {
      let docs = [];
      Object.keys(documentsDetails).forEach((key) => {
        if (
          key == "investor_documents" &&
          documentsDetails.investor_documents.length
        ) {
          docs.push({
            url: documentsDetails.investor_documents[0],
            label: key,
            name: "Investor Document",
          });
        }
        if (
          key == "compliance_audits" &&
          documentsDetails.compliance_audits.length
        ) {
          docs.push({
            url: documentsDetails.compliance_audits[0],
            label: key,
            name: "Compliance Audit",
          });
        }
        if (key == "investor_memo" && documentsDetails.investor_memo != null) {
          docs.push({
            url: documentsDetails.investor_memo,
            label: key,
            name: "investor_memo",
          });
        }
      });

      setDocuments(docs);
    }
  }, [documentsDetails]);

  /**
   * Handle the file upload event. Extract the selected file and construct a document
   * object with the file's name, current date, label, the file itself, and a url to view
   * the file. Add the document to the list of documents.
   * @param {Event} event the file upload event
   * @param {String} label the label of the document (used to determine the type of document)
   */
  const handleUpload = (event, label) => {
    const file = event.target.files[0];
    if (file) {
      const newDoc = {
        name: file.name,
        date: new Date().toLocaleDateString(),
        label: label,
        file: file,
        url: URL.createObjectURL(file), // Generate URL to view the file
      };
      setDocuments((prevDocs) => [...prevDocs, newDoc]);
    }
  };

  // Remove document
  const handleRemoveDocument = (label) => {
    setDocuments((prevDocs) => prevDocs.filter((doc) => doc.label !== label));
  };

  // Open modal to view document
  const handleViewDocument = (doc) => {
    setSelectedDoc(doc);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    if (selectedDoc?.url) {
      URL.revokeObjectURL(selectedDoc.url);
    }
    setIsModalOpen(false);
    setSelectedDoc(null);
  };

  /**
   * Saves the uploaded documents and navigates to the review and submit tab.
   * Calls the `uploadDocuments` function to upload the documents and then sets the
   * `documentUploading` state to `false` and calls the `setActiveTab` function to
   * navigate to the review and submit tab.
   */
  const handleSaveAndNext = async () => {
    setDocumentUploading(true);
    let apiId = offeringDetails.offering_id
      ? offeringDetails.offering_id
      : offeringId;
    const res = await uploadDocuments(
      documents,
      `${BASE_URL.OFFERING}/offerings/${apiId}/documents`
    );
    if (res) {
      await getOfferingData(apiId);
      setDocumentUploading(false);
      setActiveTab("Review and Submit");
    }
  };
  return (
    <div className="dashboard-content">
      <div
        className="editor-wrapper"
        style={review ? { maxWidth: "100%" } : {}}
      >
        <Box sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
          <h5 style={{ marginTop: 0 }}>Document Upload</h5>

          <Grid container spacing={2}>
            {documentLabels.map((label, index) => {
              const document = documents.find((doc) => doc.label === label.id);

              return (
                <Grid item size={{ xs: 12, md: 12 }} key={index}>
                  {document && review ? (
                    <>
                      <Box
                        sx={{
                          p: 2,
                          border: "1px solid #ddd",
                          borderRadius: 1,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          width={"100%"}
                          alignItems={"center"}
                        >
                          <Typography variant="subtitle1">
                            {label.label}
                          </Typography>

                          {document ? (
                            <></>
                          ) : (
                            <Button
                              variant="contained"
                              component="label"
                              color="primary"
                              size="small"
                            >
                              Upload
                              <input
                                type="file"
                                hidden
                                onChange={(event) =>
                                  handleUpload(event, label.id)
                                }
                                accept="application/pdf"
                              />
                            </Button>
                          )}
                        </Box>
                        {document && (
                          <IconButton
                            onClick={() => handleViewDocument(document)}
                            color="primary"
                          >
                            <PictureAsPdfIcon />
                          </IconButton>
                        )}
                      </Box>
                    </>
                  ) : (
                    !review && (
                      <Box
                        sx={{
                          p: 2,
                          border: "1px solid #ddd",
                          borderRadius: 1,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          width={"100%"}
                          alignItems={"center"}
                        >
                          <Typography variant="subtitle1">
                            {label.label}
                          </Typography>
                          {!review ? (
                            <>
                              {document ? (
                                <>
                                  <Typography variant="body2">
                                    {document.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    Uploaded on: {document.date}
                                  </Typography>
                                  <Button
                                    variant="text"
                                    color="secondary"
                                    startIcon={<DeleteIcon />}
                                    onClick={() =>
                                      handleRemoveDocument(label.id)
                                    }
                                  >
                                    Remove
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  variant="contained"
                                  component="label"
                                  color="primary"
                                  size="small"
                                >
                                  Upload
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(event) =>
                                      handleUpload(event, label.id)
                                    }
                                    accept="application/pdf"
                                  />
                                </Button>
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </Box>
                        {document && (
                          <IconButton
                            onClick={() => handleViewDocument(document)}
                            color="primary"
                          >
                            <PictureAsPdfIcon />
                          </IconButton>
                        )}
                      </Box>
                    )
                  )}
                </Grid>
              );
            })}
          </Grid>

          {/* Modal for viewing document */}
          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                {selectedDoc?.name}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <iframe
                  src={`${selectedDoc?.url}`}
                  width="100%"
                  height="500px"
                  style={{ border: "none" }}
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                endIcon={<OpenInNewIcon />}
                onClick={() => window.open(selectedDoc?.url, "_blank")}
              >
                Open in New Tab
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCloseModal}
                sx={{ ml: 2 }}
              >
                Close
              </Button>
            </Box>
          </Modal>
        </Box>
        <div className="btn-save-next">
          {!review && (
            <span
              className="btn btn-gradient btn-pill"
              onClick={handleSaveAndNext}
            >
              {documentUploading ? "Uploading..." : "Save & Next"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferingDocuments;
