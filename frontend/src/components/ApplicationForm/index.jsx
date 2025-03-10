import React, {useState} from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props) {
    console.log(props?.application)
    const [name, setName] = useState(props.application?.name || "");
    const [phone, setPhone] = useState(props.application?.phone_number|| "");
    const [email, setEmail] = useState(props.application?.email || "");
    const [isOver18, setIsOver18] = useState(!!props.application);
    const [address, setAddress] = useState(props.application?.address || "");
    const [qualitiesDescription, setDescriptionQualities] = useState(props.application?.qualifications || "");
    const [signature, setSignature] = useState(props.application?.digital_signature || "");
    const readonly = props.readOnly;
    const formErrors = props.formErrors;

    return (
        <div className="application-form" style={{textAlign: "left", alignItems: "flex-start"}}>
              <h1 className="fw-bold" style={{overflow: "hidden"}}>Just One More Step To Adoption!</h1>

              <div className="col-lg-12">
                <h2>Adoption Process:</h2>
                <p>At PetPal, we facilitate a caring and efficient process for shelters to rescue and find loving homes for abandoned pets. Shelters can sign up for an account and list these pets for adoption, providing them with a chance for a brighter future. Once a shelter lists a pet, they have the flexibility to set an adoption fee ranging from $20 to $500, reflecting the unique circumstances and needs of each animal. These fees help cover the cost of care, vaccinations, and other essentials to ensure the pet is ready for their new home. To ensure the welfare of these pets, we have established adoption requirements, which are detailed in our comprehensive terms and conditions listed below.</p>
                <h2>Terms and Conditions for Pet Adoption:</h2>
                <p>The Tenant acknowledges and agrees to the following terms:</p>
                <ol>
                <li>The Landlord has agreed to permit pet/s at the Premises as specified in the Tenancy
                      Agreement and this Pet Agreement.</li>
                  <li>Any pet/s other than the approved pet/s specified in the Tenancy Agreement and this
                      Pet Agreement must first be requested by the Tenant in writing via a separate Pet
                      Application giving full details and then be approved in writing by the Landlord
                      PRIOR to the pet/s being allowed onto the Premises. Pet approval may be subject to
                      specific criteria and must be complied with. Approval is NOT guaranteed.</li>
                  <li>The Tenant shall be liable for any damage or injury whatsoever caused by the pet/s
                      on the Property.</li>
                  <li>The Tenant accepts full responsibility and indemnifies the Landlord for any claims
                      by or injuries to third parties or their Property caused by, or as result of actions
                      by their pet/s or their guests pet/s, and regardless of their approval status.</li>
                  <li>The Tenant agrees to arrange for Flea Fumigation at the end of the Tenancy or at a
                      time during the Tenancy as required or requested by the Landlord.
                      to be carried out by a Company complying with Australian Standards.</li>
                  <li>The pet/s are to be outside at all times unless specified otherwise in the Tenancy
                      Agreement or this Pet Agreement. Guide dogs are an exception.</li>
                  <li>If the pet is a dog, the Tenant agrees to restrain or remove the dog from the
                      premises for the duration of inspections arranged by the Agent with the required
                      notice given.</li>
                  <li>By signing below you are only asking for approval of the above-mentioned pet/s to be
                      accepted at the Property for which you are applying.</li>
                </ol>
              </div>

              <div className="col-lg-12">
              <h2>Fill Out The Following Information</h2>
                <form onSubmit={(e) => {
                  e.preventDefault(); 
                  if (props.onSubmit) {
                    props.onSubmit({
                      name,
                      phone,
                      email,
                      isOver18,
                      address,
                      qualitiesDescription,
                      signature
                    });
                  }
                }}>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} readOnly={readonly} className={`form-control ${formErrors?.name ? 'is-invalid' : ''}`} />
                    {formErrors?.name && <div className="invalid-feedback">
                      {formErrors?.name}
                    </div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" className={`form-control ${formErrors?.phone_number ? 'is-invalid' : ''}`} value={phone} onChange={(e) => setPhone(e.target.value)} readOnly={readonly}  />
                    {formErrors?.phone_number && <div className="invalid-feedback">
                      {formErrors?.phone_number}
                    </div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input type="text" id="email" name="email" className={`form-control ${formErrors?.email ? 'is-invalid' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} readOnly={readonly}  />
                    {formErrors?.email && <div className="invalid-feedback">
                      {formErrors?.email}
                    </div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="over18">Are you over 18?</label>
                    <input type="checkbox" id="over18" name="over18" checked={isOver18} onChange={(e) => setIsOver18(e.target.value)} disabled={readonly} required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" className={`form-control ${formErrors?.address ? 'is-invalid' : ''}`} value={address} onChange={(e) => setAddress(e.target.value)} readOnly={readonly} />
                    {formErrors?.address && <div className="invalid-feedback">
                      {formErrors?.address}
                    </div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="suitability">What qualities or characteristics make you suitable candidates to become pet owners?</label>
                    <textarea id="suitability" name="suitability" className={`form-control ${formErrors?.qualifications ? 'is-invalid' : ''}`} rows="4" value={qualitiesDescription} onChange={(e) => setDescriptionQualities(e.target.value)} readOnly={readonly} ></textarea>
                    {formErrors?.qualifications && <div className="invalid-feedback">
                      {formErrors?.qualifications}
                    </div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="signature">Digital Signature: (I agree to the terms and conditions)</label>
                    <input type="text" id="signature" name="signature" className={`form-control ${formErrors?.digital_signature ? 'is-invalid' : ''}`} value={signature} onChange={(e) => setSignature(e.target.value)} readOnly={readonly}  />
                    {formErrors?.digital_signature && <div className="invalid-feedback">
                      {formErrors?.digital_signature}
                    </div>}
                  </div>
                    {!readonly && <button type="submit" className="btn btn-primary apply-button btn-lg">Submit Application</button>}
                </form>
              </div>
            </div>
    );
}
