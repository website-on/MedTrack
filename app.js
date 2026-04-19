// Fake Internal Database
const DB = {
    patients: [
        {
            id: '1122',
            name: 'أحمد محمود',
            disease: 'السكري',
            state: 'مستقر',
            specialtyNeeded: 'باطنة',
            history: ['دخول طوارئ 1/1/2026', 'عملية شفط سوائل ناجحة'],
            previousPlans: ['خطة علاج مبدئية تم الانتهاء منها'],
            hasAllergies: true,
            allergyTypes: 'البنسلين ومسكنات قوية',
            doctorId: '9988',
            hospId: 'hosp001',
            phone: '201011111111',
            guardianContact: 'رقم الزوجة: 201122334455',
            homeCarePlan: [
                { id: 'task1', time: '08:00 صباحاً', task: 'قياس سكر وضغط', status: 'مكتمل' }
            ],
            hospitalCarePlan: [
                { id: 'htask1', time: '09:00 صباحاً', task: 'تحليل دم شامل', status: 'مكتمل' }
            ],
            postCarePlan: [
                { id: 'ptask1', time: 'يومياً بالتزام', task: 'مشي 20 دقيقة ونظام غذائي مراقب', status: 'لم يكتمل بعد' }
            ],
            drNotes: [{ drName: 'د. محمود سعيد', date: 'توصيات حديثة', text: 'يرجى الاستمرار على العلاج والمحافظة على الوجبات.' }],
            adminNotes: []
        },
        {
            id: '3456',
            name: 'سناء محمد',
            disease: 'ضغط دم',
            state: 'حرج',
            specialtyNeeded: 'قلب',
            history: ['أزمة قلبية سابقة'],
            previousPlans: [],
            hasAllergies: false,
            allergyTypes: '',
            doctorId: '9988',
            hospId: 'hosp001',
            phone: '201022222222',
            guardianContact: '',
            homeCarePlan: [],
            hospitalCarePlan: [{ id: 'htask2', time: 'كل 4 ساعات', task: 'متابعة وريدية وعلامات حيوية', status: 'لم يكتمل بعد' }],
            postCarePlan: [],
            drNotes: [],
            adminNotes: []
        }
    ],
    doctors: [
        {
            id: '9988',
            name: 'د. محمود سعيد',
            specialty: 'باطنة وجهاز هضمي',
            code: '1234',
            hospId: 'hosp001',
            pastPatients: ['علي كمال', 'يوسف زيد'],
            availability: ['الإثنين: 10:00 ص - 02:00 م', 'الأربعاء: 04:00 م - 08:00 م', 'الخميس: 12:00 م - 03:00 م'],
            developerNotes: ['الرجاء الالتزام بإرسال التقارير اليومية للمرضى الجدد في الوقت المحدد.'],
            phone: '201011111111'
        }
    ],
    hospitals: [
        {
            id: 'hosp001',
            name: 'مستشفى الشفاء التخصصي',
            phone: '201022222222',
            developerNotes: ['يرجى التأكد من توفر الممرضين للمسارات الليلية.']
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // Screens
    const loginScreen = document.getElementById('login-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    const adminDashboardScreen = document.getElementById('admin-dashboard-screen');
    const doctorDashboardScreen = document.getElementById('doctor-dashboard-screen');
    const hospitalDashboardScreen = document.getElementById('hospital-dashboard-screen');
    const globalCornerMenu = document.getElementById('global-corner-menu');

    // Navigation and Globals
    const logoutBtns = document.querySelectorAll('.logout-btn');
    const waNumberDeveloper = '201035919821';
    let currentLoginRole = null;
    let loggedInUserId = null;

    // Menus
    const cornerMenuBtn = document.getElementById('corner-menu-btn');
    const cornerMenuDropdown = document.getElementById('corner-menu-dropdown');

    if (cornerMenuBtn && cornerMenuDropdown) {
        cornerMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            cornerMenuDropdown.classList.toggle('hidden');
        });
        document.addEventListener('click', () => {
            if (!cornerMenuDropdown.classList.contains('hidden')) {
                cornerMenuDropdown.classList.add('hidden');
            }
        });
    }

    // Modal Authentication Logic
    const loginModal = document.getElementById('login-modal');
    const modalSecretCode = document.getElementById('modal-secret-code');
    const modalLoginBtn = document.getElementById('modal-login-btn');

    window.openLoginModal = (role) => {
        currentLoginRole = role;
        if (role === 'developer') {
            globalCornerMenu.classList.add('hidden');
            showScreen(adminDashboardScreen);
            renderAdminDashboard();
            return;
        } else if (role === 'hospital') {
            globalCornerMenu.classList.add('hidden');
            loggedInUserId = 'hosp001';
            showScreen(hospitalDashboardScreen);
            renderHospitalDashboard();
            return;
        }

        loginModal.classList.remove('hidden');
        document.getElementById('modal-title').innerText = 'تسجيل دخول الطبيب';
        modalSecretCode.value = '';
        modalSecretCode.focus();
        cornerMenuDropdown.classList.add('hidden');
    };

    window.closeLoginModal = () => {
        loginModal.classList.add('hidden');
        currentLoginRole = null;
    };

    if (modalLoginBtn) modalLoginBtn.addEventListener('click', performModalLogin);
    if (modalSecretCode) {
        modalSecretCode.addEventListener('keypress', (e) => { if (e.key === 'Enter') performModalLogin(); });
    }

    function performModalLogin() {
        if (!currentLoginRole) return;
        const code = modalSecretCode.value.trim();
        if (code === '') return alert('يرجى إدخال الكود السري');

        if (currentLoginRole === 'doctor') {
            const doc = DB.doctors.find(d => d.code === code);
            if (doc) {
                loggedInUserId = doc.id;
                closeLoginModal();
                globalCornerMenu.classList.add('hidden');
                showScreen(doctorDashboardScreen);
                renderDoctorDashboard();
            } else {
                alert('كود الطبيب غير صحيح.');
            }
        }
    }

    // Patient Direct Login
    const patientCodeInput = document.getElementById('patient-code-input');
    const patientLoginBtn = document.getElementById('patient-login-btn');
    const displayCode = document.getElementById('display-code');
    const displayDoctor = document.getElementById('display-doctor-info');

    if (patientLoginBtn) {
        patientLoginBtn.addEventListener('click', () => {
            const code = patientCodeInput.value.trim();
            const pat = DB.patients.find(p => p.id === code);
            if (pat) {
                loggedInUserId = pat.id;
                if (displayCode) displayCode.innerText = pat.id;

                const doc = DB.doctors.find(d => d.id === pat.doctorId);
                if (displayDoctor && doc) {
                    displayDoctor.innerHTML = `<span style="cursor:pointer; text-decoration:underline; font-size:0.9rem;" onclick="popupDoctorAvail('${doc.id}')">طبيبك: ${doc.name} (عرض التواجد)</span>`;
                }

                globalCornerMenu.classList.add('hidden');
                showScreen(dashboardScreen);
                renderPatientDashboard(pat.id);
            } else {
                alert('كود مريض غير مقيد بالنظام.');
                patientCodeInput.focus();
            }
        });
    }

    // Dynamic Central Popup System
    const dynamicModal = document.getElementById('dynamic-glass-modal');
    const dynamicModalContent = document.getElementById('dynamic-modal-content');

    window.openDynamicModal = (htmlContent) => {
        dynamicModalContent.innerHTML = htmlContent;
        dynamicModal.classList.remove('hidden');
    };
    window.closeDynamicModal = () => { dynamicModal.classList.add('hidden'); dynamicModalContent.innerHTML = ''; };

    // Push Notifications
    window.requestNotification = () => {
        if (!("Notification" in window)) {
            alert("متصفحك الحالي لا يدعم إشعارات النظام.");
        } else if (Notification.permission === "granted") {
            const n = new Notification('MedTrack', { body: 'تمت مزامنة الإشعارات والربط مع الهاتف مسبقاً بنجاح!' });
            setTimeout(() => n.close(), 3000);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification('MedTrack', { body: 'تم تفعيل ربط إشعارات الهاتف بنجاح!' });
                }
            });
        }
    };

    window.popupDoctorAvail = (docId) => {
        const doc = DB.doctors.find(d => d.id === docId);
        if (!doc) return;
        const html = `
            <div style="text-align:center;">
                <h2 style="color:var(--primary); margin-bottom:20px;">مواعيد تواجد ${doc.name}</h2>
                <div class="glass-card" style="padding:20px;">
                    <ul style="list-style:none; padding:0; font-size:1.1rem; line-height:2;">
                        ${doc.availability.map(v => `<li><i class="fa-regular fa-clock" style="color:#0ea5e9;"></i> ${v}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        openDynamicModal(html);
    };

    // --- RENDER PATIENT DASHBOARD ---
    function renderPatientDashboard(id) {
        const p = DB.patients.find(x => x.id === id);
        if (!p) return;

        // Render Doctor Notes & Admin Notes inside Followup
        const notesContainer = document.getElementById('patient-dr-notes');
        if (notesContainer) {
            let notesHTML = '';
            // Doctor Notes
            if (p.drNotes.length) {
                notesHTML += p.drNotes.map(n => `
                    <div class="note-item">
                        <div class="note-meta">
                            <span class="dr-name"><i class="fa-solid fa-user-md"></i> ${n.drName}</span>
                            <span class="note-date">${n.date}</span>
                        </div>
                        <div class="note-body"><p>${n.text}</p></div>
                    </div>`).join('');
            }
            // Admin Notes
            if (p.adminNotes.length) {
                notesHTML += p.adminNotes.map(n => `
                    <div class="note-item" style="background:rgba(234, 179, 8, 0.1); border-right-color:var(--warning);">
                        <div class="note-meta text-main">
                            <span class="dr-name"><i class="fa-solid fa-crown"></i> الإدارة ومسؤول النظام</span>
                            <span class="note-date">تعميم جديد</span>
                        </div>
                        <div class="note-body"><p>${n}</p></div>
                    </div>`).join('');
            }

            notesContainer.innerHTML = notesHTML || '<p class="text-center" style="padding:20px;">لا توجد ملاحظات طبية أو إدارية حالياً.</p>';
        }

        // Handle specific Doctor WA link
        const docObj = DB.doctors.find(d => d.id === p.doctorId);
        const drWaBtn = document.getElementById('patient-dr-wa-btn');
        if (drWaBtn && docObj && docObj.phone) {
            drWaBtn.href = `https://wa.me/${docObj.phone}?text=MedTrack: أود التواصل مع الطبيب بخصوص حالتي`;
        }

        // Render Home Care
        const hcContainer = document.getElementById('patient-homecare-table');
        if (hcContainer) {
            hcContainer.innerHTML = p.homeCarePlan.length ? p.homeCarePlan.map(n => `
                <tr>
                    <td>${n.time}</td>
                    <td>${n.task}</td>
                    <td><span class="status ${n.status === 'مكتمل' ? 'completed' : n.status === 'تم رفضه' ? 'rejected' : 'pending'}">${n.status}</span></td>
                </tr>
            `).join('') : '<tr><td colspan="3" class="text-center">لا توجد مسارات مسجلة للمنزل</td></tr>';
        }

        // Render Hospital Care
        const hospContainer = document.getElementById('patient-hospital-timeline');
        if (hospContainer) {
            hospContainer.innerHTML = p.hospitalCarePlan.length ? p.hospitalCarePlan.map(n => `
                <div class="timeline-item">
                    <div class="time">${n.time}</div>
                    <div class="task-det"><h4>${n.task}</h4><p>الحالة المرفوعة: ${n.status}</p></div>
                </div>
            `).join('') : '<p>لا توجد مسارات مسجلة للمستشفى.</p>';
        }

        // Render Post Care
        const pcContainer = document.getElementById('patient-postcare-table');
        if (pcContainer) {
            pcContainer.innerHTML = p.postCarePlan && p.postCarePlan.length ? p.postCarePlan.map(n => `
                <tr>
                    <td>${n.time}</td>
                    <td>${n.task}</td>
                    <td><span class="status ${n.status === 'مكتمل' ? 'completed' : n.status === 'تم رفضه' ? 'rejected' : 'pending'}">${n.status}</span></td>
                </tr>
            `).join('') : '<tr><td colspan="3" class="text-center">لا توجد مهام حالية للمتابعة بعد العلاج</td></tr>';
        }
    }

    const requestCareForm = document.getElementById('care-request-form');
    if (requestCareForm) requestCareForm.addEventListener('submit', (e) => { e.preventDefault(); /*...*/ });

    // --- RENDER DOCTOR DASHBOARD ---
    function renderDoctorDashboard() {
        const d = DB.doctors.find(x => x.id === loggedInUserId);
        if (!d) return;

        const availContainer = document.getElementById('doctor-availability-list');
        if (availContainer) {
            availContainer.innerHTML = d.availability.length ? d.availability.map(a => `
                <div class="note-item" style="margin-bottom:10px; border-right:4px solid var(--primary); padding:10px;">
                    <div style="font-weight:bold;"><i class="fa-regular fa-clock"></i> ${a}</div>
                </div>`).join('') : '<p>لم يتم تسجيل أوقات تواجد.</p>';
        }

        const devNotesContainer = document.getElementById('doctor-dev-notes-list');
        if (devNotesContainer) {
            devNotesContainer.innerHTML = d.developerNotes.length ? d.developerNotes.map(n => `
                 <div class="note-item" style="background:rgba(234, 179, 8, 0.1); border-right:4px solid var(--warning); margin-bottom:15px;">
                    <div style="font-weight:bold; color:var(--text-main); margin-bottom:5px;"><i class="fa-solid fa-user-shield"></i> ملاحظة إدارية:</div>
                    <div>${n}</div>
                </div>`).join('') : '<p>لا توجد ملاحظات من مسؤول المتابعة حالياً.</p>';
        }
    }

    const docReportForm = document.getElementById('doctor-report-form');
    if (docReportForm) docReportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pid = document.getElementById('doc-patient-code').value.trim();
        const note = document.getElementById('doc-patient-note').value.trim();
        const p = DB.patients.find(x => x.id === pid);
        if (!p) return alert('كود المريض غير متوفر بالنظام!');
        if (!note) return;
        p.drNotes.unshift({ drName: DB.doctors.find(x => x.id === loggedInUserId).name, date: new Date().toLocaleDateString(), text: note });
        alert(`تم رفع الرسالة لخانة متابعة المريض مباشرةً.`);
        docReportForm.reset();
    });

    // --- RENDER ADMIN DASHBOARD ---
    window.renderAdminDashboard = () => {
        document.getElementById('admin-patient-count').innerText = `إجمالي المرضى: ${DB.patients.length}`;
        const pContainer = document.getElementById('admin-patient-list');
        pContainer.innerHTML = `<table style="width:100%; text-align:right;">
            <thead><tr><th>الكود</th><th>الاسم</th><th>إجراء</th></tr></thead><tbody>
            ${DB.patients.map(p => `<tr>
                <td>${p.id}</td><td>${p.name}</td>
                <td><button class="btn btn-primary btn-sm" onclick="openAdminPatientModal('${p.id}')">التحكم بالمسارات</button></td>
            </tr>`).join('')}</tbody></table>`;

        document.getElementById('admin-doctor-count').innerText = `إجمالي الأطباء: ${DB.doctors.length}`;
        const dContainer = document.getElementById('admin-doctor-list');
        dContainer.innerHTML = `<table style="width:100%; text-align:right;">
            <thead><tr><th>الطبيب</th><th>الكود</th><th>التخصص</th></tr></thead><tbody>
            ${DB.doctors.map(d => `<tr><td>${d.name}</td><td>${d.code}</td><td>${d.specialty}</td></tr>`).join('')}
            </tbody></table>`;

        const hContainer = document.getElementById('admin-hospital-list');
        if (hContainer) {
            hContainer.innerHTML = `<table style="width:100%; text-align:right;">
                <thead><tr><th>المستشفى</th><th>الكود</th></tr></thead><tbody>
                ${DB.hospitals.map(h => `<tr><td>${h.name}</td><td>${h.id}</td></tr>`).join('')}
                </tbody></table>`;
        }
    };

    window.openAdminPatientModal = (id) => {
        const p = DB.patients.find(x => x.id === id);
        if (!p) return;

        let homePlanHTML = p.homeCarePlan.length ? p.homeCarePlan.map(t => `<div style="padding:10px; border-bottom:1px solid #ddd; display:flex; justify-content:space-between;"><span>${t.task} (${t.time})</span> <button onclick="deleteTask('${p.id}','home','${t.id}')">حذف</button></div>`).join('') : '';

        const html = `
            <h2>إدارة وعرض بيانات المريض: ${p.name}</h2>
            <div style="background:rgba(0,0,0,0.03); padding:15px; border-radius:10px; margin-bottom:15px;">
                <label style="font-weight:bold; color:var(--text-main);">بيانات ولي الأمر / المشرف:</label>
                <div style="display:flex; gap:10px; margin-top:5px;">
                    <input type="text" id="edit-pat-guardian" value="${p.guardianContact || ''}" placeholder="سجل رقم واسم ولي الأمر لسهولة الوصول..." style="flex:1; padding:8px;">
                    <button class="btn btn-primary" onclick="updateGuardian('${p.id}')">حفظ</button>
                </div>
            </div>

            <div class="glass-card" style="padding:15px; margin-bottom:20px;">
                <h3 style="font-size:1.1rem; margin-bottom:10px;">إضافة أمر جديد لمسار المريض</h3>
                <div class="form-row" style="align-items:flex-end;">
                    <div class="form-group" style="margin-bottom:0; flex:1;">
                        <label>التوجيه لـ:</label>
                        <select id="add-path-type"><option value="home">الرعاية المنزلية</option><option value="hospital">مستشفى</option><option value="postcare">متابعة بعد العلاج</option></select>
                    </div>
                    <div class="form-group" style="margin-bottom:0; flex:1;">
                        <label>وقت التنفيذ</label><input type="text" id="add-path-time">
                    </div>
                    <div class="form-group" style="margin-bottom:0; flex:2;">
                        <label>وصف الأمر</label><input type="text" id="add-path-task">
                    </div>
                    <div class="form-group" style="margin-bottom:0; flex:0 auto;">
                        <button class="btn btn-primary" onclick="addPatientPath('${p.id}')">تكليف</button>
                    </div>
                </div>
            </div>
        `;
        openDynamicModal(html);
    };

    window.updateGuardian = (pId) => {
        const val = document.getElementById('edit-pat-guardian').value;
        const p = DB.patients.find(x => x.id === pId);
        if (p) { p.guardianContact = val; alert('تم الحفظ بنجاح.'); }
    };

    window.addPatientPath = (id) => {
        const p = DB.patients.find(x => x.id === id);
        if (!p) return;
        const type = document.getElementById('add-path-type').value;
        const time = document.getElementById('add-path-time').value;
        const task = document.getElementById('add-path-task').value;
        if (!time || !task) return;
        const newTask = { id: 't_' + Date.now(), time, task, status: 'لم يكتمل بعد' };
        if (type === 'home') p.homeCarePlan.push(newTask);
        else if (type === 'hospital') p.hospitalCarePlan.push(newTask);
        else if (type === 'postcare') p.postCarePlan.push(newTask);
        openAdminPatientModal(id);
    };

    // Admin Messaging Logic
    const adminMsgSelect = document.getElementById('admin-msg-type');
    const adminMsgTarget = document.getElementById('admin-msg-target');
    if (adminMsgSelect) {
        window.updateAdminMsgTargets = () => {
            const type = adminMsgSelect.value;
            let html = '';
            if (type === 'doctor') html = DB.doctors.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
            else if (type === 'hospital') html = DB.hospitals.map(h => `<option value="${h.id}">${h.name}</option>`).join('');
            else if (type === 'patient') html = DB.patients.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
            adminMsgTarget.innerHTML = html;
        };
        adminMsgSelect.addEventListener('change', updateAdminMsgTargets);
    }
    window.sendAdminMessage = () => {
        const type = document.getElementById('admin-msg-type').value;
        const targetId = document.getElementById('admin-msg-target').value;
        const txt = document.getElementById('admin-msg-text').value.trim();
        if (!txt) return;

        if (type === 'doctor') {
            const d = DB.doctors.find(x => x.id === targetId);
            if (d) d.developerNotes.unshift(txt);
        } else if (type === 'hospital') {
            const h = DB.hospitals.find(x => x.id === targetId);
            if (h) {
                if (!h.developerNotes) h.developerNotes = [];
                h.developerNotes.unshift(txt);
            }
        } else if (type === 'patient') {
            const p = DB.patients.find(x => x.id === targetId);
            if (p) p.adminNotes.unshift(txt);
        }
        alert('تم إرسال التعميم للشخص المحدد بنجاح!');
        document.getElementById('admin-msg-text').value = '';
    };

    // Admin Add Entities
    window.adminAddDoctor = () => {
        const name = document.getElementById('add-doc-name').value;
        const code = document.getElementById('add-doc-code').value;
        const spec = document.getElementById('add-doc-spec').value;
        const avail = document.getElementById('add-doc-avail').value;
        const phone = document.getElementById('add-doc-phone').value;
        if (!name || !code) return alert('البيانات غير مكتملة');
        DB.doctors.push({
            id: 'd_' + Date.now(), name, code, specialty: spec, hospId: 'hosp001', pastPatients: [],
            availability: avail ? [avail] : [], developerNotes: [], phone
        });
        alert('تم إضافة الطبيب بنجاح للشبكة');
        renderAdminDashboard();
    };

    window.adminAddHospital = () => {
        const name = document.getElementById('add-hosp-name').value;
        const code = document.getElementById('add-hosp-code').value;
        const phone = document.getElementById('add-hosp-phone').value;
        if (!name || !code) return alert('البيانات غير مكتملة');
        DB.hospitals.push({ id: code, name, developerNotes: [], phone });
        alert('تمت إضافة المستشفى بنجاح');
        renderAdminDashboard();
    };

    window.deleteTask = (pId, listType, taskId) => {
        const p = DB.patients.find(x => x.id === pId);
        if (!p) return;
        if (listType === 'home') p.homeCarePlan = p.homeCarePlan.filter(t => t.id !== taskId);
        else if (listType === 'hospital') p.hospitalCarePlan = p.hospitalCarePlan.filter(t => t.id !== taskId);
        else if (listType === 'postcare') p.postCarePlan = p.postCarePlan.filter(t => t.id !== taskId);
        openAdminPatientModal(pId);
    };

    // --- RENDER HOSPITAL DASHBOARD ---
    window.renderHospitalDashboard = (searchTerm = '') => {
        const hpContainer = document.getElementById('hospital-patients-render');
        if (hpContainer) {
            let pList = DB.patients.filter(p => p.hospId === 'hosp001');
            if (searchTerm) pList = pList.filter(p => p.name.includes(searchTerm) || p.id.includes(searchTerm));
            hpContainer.innerHTML = pList.length ? pList.map(p => `
                <div class="glass-card" style="padding:15px; margin-bottom:10px; cursor:pointer;" onclick="openHospPatientModal('${p.id}')">
                    <h4 style="margin:0;">${p.name}</h4>
                    <p style="margin:5px 0 0; font-size:0.9rem; color:var(--text-muted);">انقر لعرض البيانات والمسارات السريرية المطلوبة</p>
                </div>
            `).join('') : '<p>لا توجد نتائج.</p>';
        }

        const devNotesContainer = document.getElementById('hospital-dev-notes-list');
        if (devNotesContainer) {
            const h = DB.hospitals.find(x => x.id === 'hosp001');
            if (h && h.developerNotes && h.developerNotes.length) {
                devNotesContainer.innerHTML = h.developerNotes.map(n => `
                <div class="note-item" style="background:rgba(234, 179, 8, 0.1); border-right:4px solid var(--warning); margin-bottom:15px;">
                    <div style="font-weight:bold; color:var(--text-main);"><i class="fa-solid fa-crown"></i> توجيهات المطور:</div>
                    <div>${n}</div>
                </div>`).join('');
            } else {
                devNotesContainer.innerHTML = '<p>لا توجد تعميمات حالية</p>';
            }
        }
    };

    window.openHospPatientModal = (id) => {
        const p = DB.patients.find(x => x.id === id);
        if (!p) return;
        const html = `
            <h2 style="color:var(--primary); margin-bottom:15px;">الملف السريري: ${p.name}</h2>
            <div style="background:rgba(0,0,0,0.03); padding:15px; border-radius:10px; line-height:1.8;">
                <p><strong>وجود حساسية طبية:</strong> ${p.hasAllergies ? `<span style="color:red">نعم (${p.allergyTypes})</span>` : 'لا توجد'}</p>
                <hr style="border:1px solid #ddd; margin:15px 0;">
                <h3 style="color:var(--text-main); font-size:1.1rem;">أوامر المطور للمستشفى:</h3>
                <ul>${p.hospitalCarePlan.map(t => `<li>${t.task} (${t.time}) - حالة: <strong>${t.status}</strong></li>`).join('')}</ul>
            </div>
        `;
        openDynamicModal(html);
    };

    // Abstract Screen Visibility
    function showScreen(screen) {
        [loginScreen, dashboardScreen, adminDashboardScreen, doctorDashboardScreen, hospitalDashboardScreen].forEach(s => {
            if (s) s.classList.remove('active');
        });
        screen.classList.add('active');
        const activeTab = screen.querySelector('.tab-pane.active');
        if (activeTab) {
            activeTab.classList.remove('fade-in'); void activeTab.offsetWidth; activeTab.classList.add('fade-in');
        }
    }

    logoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showScreen(loginScreen);
            globalCornerMenu.classList.remove('hidden');
            loggedInUserId = null;
            if (patientCodeInput) patientCodeInput.value = '';
            if (modalSecretCode) modalSecretCode.value = '';
        });
    });

    const navLinks = document.querySelectorAll('.nav-links li[data-tab]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const screen = link.closest('.screen-box');
            if (!screen) return;
            screen.querySelectorAll('[data-tab]').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const targetPane = document.getElementById(link.getAttribute('data-tab'));
            if (targetPane) {
                screen.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
                targetPane.classList.add('active');
                targetPane.classList.remove('fade-in'); void targetPane.offsetWidth; targetPane.classList.add('fade-in');
            }
            if (link.getAttribute('data-tab') === 'admin-messaging' && window.updateAdminMsgTargets) window.updateAdminMsgTargets();
        });
    });
});
