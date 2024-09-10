const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib

async function modifyPdf() {
    //Get data from leavechit.html forms
    let firstName = document.getElementById('First Name').value;
    let middleName = document.getElementById('Middle Name').value;
    let lastName = document.getElementById('Last Name').value;
    let employeeID = document.getElementById('Employee ID').value;
    let firstChoice = document.getElementById('Leave First').value;
    let secondChoice = document.getElementById('Leave Second').value;
    let thirdChoice = document.getElementById('Leave Third').value;
    let fourthChoice = document.getElementById('Leave Fourth').value;
    let fifthChoice = document.getElementById('Leave Fifth').value;
    let sixthChoice = document.getElementById('Leave Sixth').value;
    let dateStartString = document.getElementById('Date Start').value;
    let dateEndString = document.getElementById('Date End').value;
    let annualHours = document.getElementById('Annual Hours').value;
    let compHours = document.getElementById('Comp Hours').value;
    let sickHours = document.getElementById('Sick Hours').value;
    let shoreDays = document.getElementById('Shore Days').value;
    let travelHours = document.getElementById('Travel Comp Hours').value;
    let timeAWD = document.getElementById('Time Off AWD Hours').value;
    let fmla = document.getElementById('fmla-leave').value;
    let fmlaeReason = document.getElementById('fmla-reason').value;
    let phoneNumber = document.getElementById('Phone Number').value;
    let email = document.getElementById('Email').value;
    let remarks = document.getElementById('Remarks').value;

    // Combine the remarks content
    let fullRemarks = `Contact: ${phoneNumber} / ${email}; ${remarks}`;
    
    //Declare leave days variables
    let annualDays = Math.floor(annualHours / 8);
    let compDays = Math.floor(compHours / 8);
    let sickDays = Math.floor(sickHours / 8);
    let travelDays = Math.floor(travelHours / 8);
    let timeAWDDays = Math.floor(timeAWD / 8);
    let LWOPDays = 0;

    //Calculate end dates for each leave type
    let startDate = new Date(dateStartString);
    let endDate = new Date(dateEndString);

    //let timeOffset = startDate.getTimezoneOffset();
    //startDate.setMinutes(timeOffset);
    //endDate.setMinutes(timeOffset);

    //console.log('Adjusted Start Date: ' + startDate.toUTCString());
    //console.log('Adjusted End Date: ' + endDate.toUTCString());

    let count = 0;
    const curDate = new Date(startDate.getTime());
    let SSH = 0;
    let zeroCheck = 0;
    let curChoice = firstChoice;
    let debugCount = 0;

    //Declare date strings
    let startDateShoreString = '';
    let endDateShoreString = '';
    let startDateAnnualString = '';
    let endDateAnnualString = '';
    let startDateCompString = '';
    let endDateCompString = '';
    let startDateSickString = '';
    let endDateSickString = '';
    let startDateTravelString = '';
    let endDateTravelString = '';
    let startDateAWDString = '';
    let endDateAWDString = '';
    let startDateLWOPString = '';
    let endDateLWOPString = '';

    while (Date.UTC(curDate.getUTCFullYear(), curDate.getUTCMonth(), curDate.getUTCDate()) <= Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate())) {
        SSH = 0;
        zeroCheck = 0;

        // Assign new choice start date
        if (curChoice == 'Shore' && count == 0) {
            startDateShoreString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
        } else if (curChoice == 'Annual' && count == 0) {
            startDateAnnualString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
        } else if (curChoice == 'Compensatory' && count == 0) {
            startDateCompString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
        } else if (curChoice == 'Sick' && count == 0) {
            startDateSickString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
        } else if (curChoice == 'Travel Comp' && count == 0) {
            startDateTravelString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
        } else if (curChoice == 'Time Off AWD' && count == 0) {
            startDateAWDString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
        } else if (curChoice == 'LWOP' && count == 0) {
            startDateLWOPString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
        }

        const dayOfWeek = curDate.getUTCDay();
        if(dayOfWeek == 0 || dayOfWeek == 6) {
            // Weekend
            SSH = 1;
        } else if (curDate.getUTCMonth() == 0 && curDate.getUTCDate() == 1) {
            // New Year's Day, non-weekend
            SSH = 1;
        } else if ((curDate.getUTCMonth() == 0 && curDate.getUTCDate() == 2) && dayOfWeek == 1) {
            // Sunday New Year's Day, Observed Monday
            SSH = 1;
        } else if ((curDate.getUTCMonth() == 11 && curDate.getUTCDate() == 31) && dayOfWeek == 5) {
            // Saturday New Year's Day, observed Friday
            SSH = 1;
        } else if ((curDate.getUTCDate() >= 15 && curDate.getUTCDate() <= 21) && (dayOfWeek == 1 && curDate.getUTCMonth() == 0)) {
            // Third Monday of January, MLK Jr's Birthday
            SSH = 1;
        } else if ((curDate.getUTCDate() >= 15 && curDate.getUTCDate() <= 21) && (dayOfWeek == 1 && curDate.getUTCMonth() == 1)) {
            // Third Monday of February, Washington's Birthday
            SSH = 1;
        } else if ((curDate.getUTCDate() >= 25 && curDate.getUTCDate() <= 31) && (dayOfWeek == 1 && curDate.getUTCMonth() == 4)) {
            // Last Monday of May, Memorial Day
            SSH = 1;
        } else if ((curDate.getUTCDate() >= 1 && curDate.getUTCDate() <= 7) && (dayOfWeek == 1 && curDate.getUTCMonth() == 8)) {
            // First Monday of September, Labor Day
            SSH = 1;
        } else if ((curDate.getUTCDate() >= 8 && curDate.getUTCDate() <= 14) && (dayOfWeek == 1 && curDate.getUTCMonth() == 9)) {
            // Second Monday of October, Colombus Day
            SSH = 1;
        } else if ((curDate.getUTCDate() >= 15 && curDate.getUTCDate() <= 21) && (dayOfWeek == 1 && curDate.getUTCMonth() == 1)) {
            // Fourth Thursday of November, Thanksgiving
            SSH = 1;
        } else if (curDate.getUTCMonth() == 5 && curDate.getUTCDate() == 19) {
            // Juneteenth, non-weekend
            SSH = 1;
        } else if ((curDate.getUTCMonth() == 5 && curDate.getUTCDate() == 20) && dayOfWeek == 1) {
            // Sunday Juneteenth, Observed Monday
            SSH = 1;
        } else if ((curDate.getUTCMonth() == 5 && curDate.getUTCDate() == 18) && dayOfWeek == 5) {
            // Saturday Juneteenth, observed Friday
            SSH = 1;
        } else if (curDate.getUTCMonth() == 6 && curDate.getUTCDate() == 4) {
            // Independence Day, non-weekend
            SSH = 1;
        } else if ((curDate.getUTCMonth() == 6 && curDate.getUTCDate() == 5) && dayOfWeek == 1) {
            // Sunday Independence Day, Observed Monday
            SSH = 1;
        } else if ((curDate.getUTCMonth() == 6 && curDate.getUTCDate() == 3) && dayOfWeek == 5) {
            // Saturday Independence Day, observed Friday
            SSH = 1;
        } else if (curDate.getUTCMonth() == 10 && curDate.getUTCDate() == 11) {
            // Veterans' Day, non-weekend
            SSH = 1;
        } else if ((curDate.getUTCMonth() == 10 && curDate.getUTCDate() == 12) && dayOfWeek == 1) {
            // Sunday Veterans' Day, Observed Monday
            SSH = 1;
        } else if ((curDate.getUTCMonth() == 10 && curDate.getUTCDate() == 10) && dayOfWeek == 5) {
            // Saturday Veterans' Day, observed Friday
            SSH = 1;
        } else if (curDate.getUTCMonth() == 11 && curDate.getUTCDate() == 25) {
            // Christmas, non-weekend
            SSH = 1;
        } else if ((curDate.getUTCMonth() == 11 && curDate.getUTCDate() == 26) && dayOfWeek == 1) {
            // Sunday Christmas, Observed Monday
            SSH = 1;
        } else if ((curDate.getUTCMonth() == 11 && curDate.getUTCDate() == 24) && dayOfWeek == 5) {
            // Saturday Christmas, observed Friday
            SSH = 1;
        }
        // Increase day count if day is not holiday or weekend

        if (SSH == 0) count++;

        // Check if count exceeds leave available for current choice, move to next choice
        while (zeroCheck == 0) {
            if (curChoice == 'Shore' && count == shoreDays || curChoice == 'Shore' && shoreDays == 0) {
                endDateShoreString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
                count = 0;
                if (firstChoice == 'Shore') {
                    curChoice = secondChoice;
                } else if (secondChoice == 'Shore') {
                    curChoice = thirdChoice;
                } else if (thirdChoice == 'Shore') {
                    curChoice = fourthChoice;
                } else if (fourthChoice == 'Shore') {
                    curChoice = fifthChoice;
                } else if (fifthChoice == 'Shore') {
                    curChoice = sixthChoice
                } else if (sixthChoice == 'Shore') {
                    curChoice = 'LWOP';
                }
            } else if (curChoice == 'Annual' && count == annualDays || curChoice == 'Annual' && annualDays == 0) {
                console.log("annual")
                endDateAnnualString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
                count = 0;
                if (firstChoice == 'Annual') {
                    curChoice = secondChoice;
                } else if (secondChoice == 'Annual') {
                    curChoice = thirdChoice;
                } else if (thirdChoice == 'Annual') {
                    curChoice = fourthChoice;
                } else if (fourthChoice == 'Annual') {
                    curChoice = fifthChoice;
                } else if (fifthChoice == 'Annual') {
                    curChoice = sixthChoice;
                } else if (sixthChoice == 'Annual') {
                    curChoice = 'LWOP';
                }
            } else if (curChoice == 'Compensatory' && count == compDays || curChoice == 'Compensatory' && compDays == 0) {
                endDateCompString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
                count = 0;
                if (firstChoice == 'Compensatory') {
                    curChoice = secondChoice;
                } else if (secondChoice == 'Compensatory') {
                    curChoice = thirdChoice;
                } else if (thirdChoice == 'Compensatory') {
                    curChoice = fourthChoice;
                } else if (fourthChoice == 'Compensatory') {
                    curChoice = fifthChoice;
                } else if (fifthChoice == 'Compensatory') {
                    curChoice = sixthChoice;
                } else if (sixthChoice == 'Compensatory') {
                    curChoice = 'LWOP';
                }
            } else if (curChoice == 'Sick' && count == sickDays || curChoice == 'Sick' && sickDays == 0) {
                endDateSickString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
                count = 0;
                if (firstChoice == 'Sick') {
                    curChoice = secondChoice;
                } else if (secondChoice == 'Sick') {
                    curChoice = thirdChoice;
                } else if (thirdChoice == 'Sick') {
                    curChoice = fourthChoice;
                } else if (fourthChoice == 'Sick') {
                    curChoice = fifthChoice;
                } else if (fifthChoice == 'Sick') {
                    curChoice = sixthChoice
                } else if (sixthChoice == 'Sick') {
                    curChoice = 'LWOP';
                }
            } else if (curChoice == 'Travel Comp' && count == travelDays || curChoice == 'Travel Comp' && travelDays == 0) {
                    endDateTravelString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
                    count = 0;
                    if (firstChoice == 'Travel Comp') {
                        curChoice = secondChoice;
                    } else if (secondChoice == 'Travel Comp') {
                        curChoice = thirdChoice;
                    } else if (thirdChoice == 'Travel Comp') {
                        curChoice = fourthChoice;
                    } else if (fourthChoice == 'Travel Comp') {
                        curChoice = fifthChoice;
                    } else if (fifthChoice == 'Travel Comp') {
                        curChoice = sixthChoice;
                    } else if (sixthChoice == 'Travel Comp') {
                        curChoice = 'LWOP';
                    }
            } else if (curChoice == 'Time Off AWD' && count == timeAWDDays || curChoice == 'Time Off AWD' && timeAWDDays == 0) {
                endDateAWDString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
                count = 0;
                if (firstChoice == 'Time Off AWD') {
                    curChoice = secondChoice;
                } else if (secondChoice == 'Time Off AWD') {
                    curChoice = thirdChoice;
                } else if (thirdChoice == 'Time Off AWD') {
                    curChoice = fourthChoice;
                } else if (fourthChoice == 'Time Off AWD') {
                    curChoice = fifthChoice;
                } else if (fifthChoice == 'Time Off AWD') {
                    curChoice = sixthChoice;
                } else if (sixthChoice == 'Time Off AWD') {
                    curChoice = 'LWOP';
                }
            }
            else {
                // curChoice = 'LWOP';
                zeroCheck = 1;
            }
        }
        //Check if last loop, set final end date
        if (curChoice == 'Shore' && Date.UTC(curDate.getUTCFullYear(), curDate.getUTCMonth(), curDate.getUTCDate()) >= Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate())) {
            endDateShoreString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
            shoreDays = count;
        }
        if (curChoice == 'Annual' && Date.UTC(curDate.getUTCFullYear(), curDate.getUTCMonth(), curDate.getUTCDate()) >= Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate())) {
            endDateAnnualString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
            annualDays = count;
        }
        if (curChoice == 'Compensatory' && Date.UTC(curDate.getUTCFullYear(), curDate.getUTCMonth(), curDate.getUTCDate()) >= Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate())) {
            endDateCompString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
            compDays = count;
        }
        if (curChoice == 'Sick' && Date.UTC(curDate.getUTCFullYear(), curDate.getUTCMonth(), curDate.getUTCDate()) >= Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate())) {
            endDateSickString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
            sickDays = count;
        }
        if (curChoice == 'Travel Comp' && Date.UTC(curDate.getUTCFullYear(), curDate.getUTCMonth(), curDate.getUTCDate()) >= Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate())) {
            endDateTravelString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
            sickDays = count;
        }
        if (curChoice == 'Time Off AWD' && Date.UTC(curDate.getUTCFullYear(), curDate.getUTCMonth(), curDate.getUTCDate()) >= Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate())) {
            endDateAWDString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
            sickDays = count;
        }
        if (curChoice == 'LWOP' && Date.UTC(curDate.getUTCFullYear(), curDate.getUTCMonth(), curDate.getUTCDate()) >= Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate())) {
            endDateLWOPString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric", timeZone:"UTC"});
            LWOPDays = count;
        }

        curDate.setUTCDate(curDate.getUTCDate() + 1);
        debugCount++;
    }

    let curDatems = curDate.getMilliseconds();
    let endDatems = endDate.getMilliseconds();

    // Fetch an existing PDF document
    const url = 'opm71_fillable.pdf';
  	const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
    
    // Fetch logo image
	const pngLogoUrl = 'Images/Artboard 2.png';
    const pngLogoBytes = await fetch(pngLogoUrl).then((res) => res.arrayBuffer());

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    
    // Load logo image from bytes
	const pngLogo = await pdfDoc.embedPng(pngLogoBytes);
    
    const pngLogoDims = pngLogo.scale(0.05);
    
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize()

    // Get PDFDocument Form Fields
    const form = pdfDoc.getForm();
    // const fields = form.getFields();
    // fields.forEach(field => {
    //    const type = field.constructor.name;
    //    const name = field.getName();
    //    var fieldText = '';
    //    try {
    //        fieldText = field.getText();
    //        fieldChecked = 'null';
    //    }
    //    catch(err) {
    //        fieldText = 'null';
    //        try {
    //            fieldChecked = field.isChecked();
    //        }
    //        catch(err) {
    //            fieldChecked = 'null';
    //        }
    //    }
    //    console.log(`${type}: ${name}: ${fieldText}: ${fieldChecked}`);
    // })

    //Convert Final days to hours
    annualHours = annualDays * 8;
    sickHours = sickDays * 8;
    compHours = compDays * 8;
    let LWOPHours = LWOPDays * 8;

    // Fill PDF Text Fields
    form.getTextField('form1[0].#subform[0].Table1[0].Row2[0].TextField[0]').setText(lastName + ', ' + firstName + ', ' + middleName);
    form.getTextField('form1[0].#subform[0].Table1[0].Row2[0].TextField[1]').setText(employeeID);
    form.getTextField('form1[0].#subform[0].Table1[0].Row4[0].TextField[0]').setText('Military Sealift Command');
    

    // Fill leave date fields
    if (startDateShoreString != '') {
        form.getCheckBox('form1[0].#subform[0].CheckBox4[1]').check();
        form.getTextField('form1[0].#subform[0].Table7[0].Row2[0].DateTimeField21[0]').setText(startDateShoreString);
        form.getTextField('form1[0].#subform[0].Table7[0].Row2[0].DateTimeField22[0]').setText(endDateShoreString);
        form.getTextField('form1[0].#subform[0].Table7[0].Row2[0].DateTimeField28[0]').setText('8:00:00 AM');
        form.getTextField('form1[0].#subform[0].Table7[0].Row2[0].DateTimeField31[0]').setText('5:00:00 PM');
        form.getTextField('form1[0].#subform[0].Table7[0].Row2[0].TextField[0]').setText(shoreDays.toString());
        form.getTextField('form1[0].#subform[0].Table8[0].Row2[0].TextField[0]').setText(shoreDays + ' days to be billed as shore leave days.');
        fullRemarks = shoreDays + " Shore Days for " + startDateShoreString + " - " + endDateShoreString + "; " + fullRemarks;
    }
    if (startDateAnnualString != '') {
        form.getCheckBox('form1[0].#subform[0].CheckBox1[0]').check();
        form.getTextField('form1[0].#subform[0].Table3[0].Row3[0].DateTimeField1[0]').setText(startDateAnnualString);
        form.getTextField('form1[0].#subform[0].Table3[0].Row3[0].DateTimeField2[0]').setText(endDateAnnualString);
        form.getTextField('form1[0].#subform[0].Table3[1].Row3[0].DateTimeField1[0]').setText('8:00:00 AM');
        form.getTextField('form1[0].#subform[0].Table3[1].Row3[0].DateTimeField2[0]').setText('5:00:00 PM');
        form.getTextField('form1[0].#subform[0].Table4[0].Row2[0].TextField[0]').setText(annualHours.toString());
    }
    if (startDateCompString != '') {
        form.getCheckBox('form1[0].#subform[0].CheckBox4[0]').check();
        form.getTextField('form1[0].#subform[0].Table7[0].Row1[0].DateTimeField19[0]').setText(startDateCompString);
        form.getTextField('form1[0].#subform[0].Table7[0].Row1[0].DateTimeField20[0]').setText(endDateCompString);
        form.getTextField('form1[0].#subform[0].Table7[0].Row1[0].DateTimeField27[0]').setText('8:00:00 AM');
        form.getTextField('form1[0].#subform[0].Table7[0].Row1[0].DateTimeField30[0]').setText('5:00:00 PM');
        form.getTextField('form1[0].#subform[0].Table7[0].Row1[0].TextField[0]').setText(compHours.toString());
    }
    if (startDateSickString != '') {
        form.getCheckBox('form1[0].#subform[0].CheckBox1[3]').check();
        form.getTextField('form1[0].#subform[0].Table3[0].Row6[0].DateTimeField7[0]').setText(startDateSickString);
        form.getTextField('form1[0].#subform[0].Table3[0].Row6[0].DateTimeField8[0]').setText(endDateSickString);
        form.getTextField('form1[0].#subform[0].Table3[1].Row6[0].DateTimeField15[0]').setText('8:00:00 AM');
        form.getTextField('form1[0].#subform[0].Table3[1].Row6[0].DateTimeField16[0]').setText('5:00:00 PM');
        form.getTextField('form1[0].#subform[0].Table4[0].Row5[0].TextField[0]').setText(sickHours.toString());
    }
    if (startDateTravelString != '') {
        fullRemarks = travelHours + " hours Travel Comp for " + startDateTravelString + " - " + endDateTravelString + "; " + fullRemarks;
    }
    if (startDateAWDString != '') {
        fullRemarks = timeAWD + " hours Time Off AWD for " + startDateAWDString + " - " + endDateAWDString + "; " + fullRemarks;
    }
    if (startDateLWOPString != '') {
        form.getCheckBox('form1[0].#subform[0].CheckBox4[2]').check();
        form.getTextField('form1[0].#subform[0].Table7[0].Row3[0].DateTimeField23[0]').setText(startDateLWOPString);
        form.getTextField('form1[0].#subform[0].Table7[0].Row3[0].DateTimeField24[0]').setText(endDateLWOPString);
        form.getTextField('form1[0].#subform[0].Table7[0].Row3[0].DateTimeField29[0]').setText('8:00:00 AM');
        form.getTextField('form1[0].#subform[0].Table7[0].Row3[0].DateTimeField32[0]').setText('5:00:00 PM');
        form.getTextField('form1[0].#subform[0].Table7[0].Row3[0].TextField[0]').setText(LWOPHours.toString());
    }

    if (fmla == 'Yes') {
        form.getCheckBox('form1[0].#subform[0].CheckBox2[0]').check();
        if (fmlaeReason == 'Birth/Adoption/Foster Care') {
            form.getCheckBox('form1[0].#subform[0].CheckBox2[1]').check();
        } else if (fmlaeReason == 'Serious health condition of spouse, son, daughter, or parent') {
            form.getCheckBox('form1[0].#subform[0].CheckBox2[2]').check();
        } else if (fmlaeReason == 'Serious health condition of self') {
            form.getCheckBox('form1[0].#subform[0].CheckBox2[3]').check();
        }
    }

    // Set the remarks in the PDF
    form.getTextField('form1[0].#subform[0].Table8[0].Row2[0].TextField[0]').setText(fullRemarks);

	//Draw logo on page
	firstPage.drawImage(pngLogo, {
    	x: 5, // firstPage.getWidth() / 2 - pngLogoDims.width / 2,
        y: 5, // firstPage.getHeight() - pngLogoDims.height - 10,
        width: pngLogoDims.width,
        height: pngLogoDims.height
    })
    firstPage.drawImage(pngLogo, {
    	x: firstPage.getWidth() - (pngLogoDims.width * 0.9) - 5,
        y: firstPage.getHeight() - (pngLogoDims.height * 0.9) - 5,
        width: pngLogoDims.width * 0.9,
        height: pngLogoDims.height * 0.9
    })
    
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save({dataUri: true})
      
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    document.getElementById('pdf').src = pdfDataUri;
	// Trigger the browser to download the PDF document
    download(pdfBytes, "OPM71 Filled.pdf", "application/pdf");
}