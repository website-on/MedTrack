// Fake Internal Database (with LocalStorage Persistence)
let DB = localStorage.getItem('medtrack_DB') ? JSON.parse(localStorage.getItem('medtrack_DB')) : {
    patients: [
        {
            id: '1122', name: 'أحمد محمود', email: 'ahmed@gmail.com', password: '123', disease: 'السكري', state: 'مستقر', specialtyNeeded: 'باطنة', packagePlan: 'الباقة الماسية',
            history: 'دخول طوارئ 1/1/2026 وعملية ناجحة', previousPlans: [],
            hasAllergies: true, allergyTypes: 'البنسلين ومسكنات قوية',
            doctorId: '9988', hospId: 'hosp001', phone: '201011111111', guardianContact: '201122334455',
            age: '45', governorate: 'القاهرة', city: 'مدينة نصر', coverImg: 'logo.jpg',
            homeCarePlan: [{ id: 'task1', time: '08:00 صباحاً', task: 'قياس سكر وضغط', status: 'مكتمل' }],
            hospitalCarePlan: [{ id: 'htask1', time: '09:00 صباحاً', task: 'تحليل دم شامل', status: 'مكتمل' }],
            postCarePlan: [{ id: 'ptask1', time: 'يومياً بالتزام', task: 'مشي 20 دقيقة', status: 'لم يكتمل بعد' }],
            drNotes: [{ drName: 'د. محمود سعيد', date: 'توصيات حديثة', text: 'يرجى الاستمرار على العلاج والمحافظة على الوجبات.' }],
            adminNotes: []
        },
        {
            id: '3456', name: 'سناء محمد', email: 'sanaa@gmail.com', password: '123', disease: 'ضغط دم', state: 'حرج', specialtyNeeded: 'قلب', packagePlan: 'الباقة البرونزية',
            history: 'أزمة قلبية سابقة', previousPlans: [],
            hasAllergies: false, allergyTypes: '',
            doctorId: '9988', hospId: 'hosp001', phone: '201022222222', guardianContact: '',
            age: '55', governorate: 'الجيزة', city: 'الدقي', coverImg: 'logo.jpg',
            homeCarePlan: [],
            hospitalCarePlan: [{ id: 'htask2', time: 'كل 4 ساعات', task: 'متابعة وريدية وعلامات حيوية', status: 'لم يكتمل بعد' }],
            postCarePlan: [], drNotes: [], adminNotes: []
        },
        {
            id: '7777', name: 'زياد أحمد', email: 'zyad@gmail.com', password: '123', disease: 'ربو مزمن و ضعف مناعي', state: 'تحت الملاحظة', specialtyNeeded: 'أمراض صدرية ومناعة', packagePlan: 'الباقة الذهبية',
            history: 'تعرض لنوبات ربو حادة أدت إلى دخول العناية المركزة عدة مرات في 2024 و 2025. استجابة ضعيفة لموسعات الشعب التقليدية.', previousPlans: [],
            hasAllergies: true, allergyTypes: 'الغبار، حبوب اللقاح، وبعض أدوية البنسلين',
            doctorId: '9988', hospId: 'hosp001', phone: '201033333333', guardianContact: '201044444444',
            age: '29', governorate: 'الإسكندرية', city: 'سيدي بشر', coverImg: 'logo.jpg',
            homeCarePlan: [
                { id: 'ztask1', time: '07:00 صباحاً', task: 'جلستين بخار موسع للشعب (سيمبيكورت)', status: 'مكتمل' },
                { id: 'ztask2', time: '12:00 ظهراً', task: 'قياس مستوى الأكسجين في الدم (SpO2)', status: 'لم يكتمل بعد' },
                { id: 'ztask3', time: '08:00 مساءً', task: 'تناول أقراص تعزيز المناعة وحبوب الحساسية', status: 'لم يكتمل بعد' }
            ],
            hospitalCarePlan: [
                { id: 'zhtask1', time: '10:00 صباحاً', task: 'فحص وظائف الرئة الشامل (Spirometry)', status: 'مكتمل' },
                { id: 'zhtask2', time: '02:00 ظهراً', task: 'جلسة أكسجين مركزة وحقن كورتيزون تنفسي', status: 'لم يكتمل بعد' }
            ],
            postCarePlan: [
                { id: 'zptask1', time: 'شهرياً', task: 'مراجعة أرقام مقياس ذروة الجريان (Peak Flow)', status: 'لم يكتمل بعد' },
                { id: 'zptask2', time: 'أسبوعياً', task: 'الابتعاد تماماً عن التيارات الباردة والأتربة', status: 'مكتمل' }
            ],
            drNotes: [
                { drName: 'د. محمود سعيد', date: 'تحديث حالة', text: 'زياد يحتاج إلى أكسجين احتياطي بالمنزل تحسباً لأي أزمة مفاجئة.' },
                { drName: 'د. محمود سعيد', date: 'تنبيه أدوية', text: 'ممنوع صرف أي مسكنات عادية، فقط باراسيتامول لتفادي تحسس الصدر.' }
            ],
            adminNotes: [
                'تم ترقية باقة زياد إلى الباقة الذهبية لضمان كشف طوارئ منزلي في غضون ساعتين.',
                'تم ربط رقمه مباشرة بسيارة الإسعاف الخاصة بالمستشفى.'
            ]
        }
    ],
    doctors: [
        {
            id: '9988', name: 'د. محمود سعيد', specialty: 'باطنة وجهاز هضمي', code: '1234', hospId: 'hosp001',
            pastPatients: [], availability: ['الإثنين: 10:00 ص - 02:00 م', 'الأربعاء: 04:00 م - 08:00 م'],
            developerNotes: ['الرجاء الالتزام بإرسال التقارير.'], phone: '201011111111'
        }
    ],
    hospitals: [
        { id: 'hosp001', name: 'مستشفى الشفاء التخصصي', phone: '201022222222', governorate: 'القاهرة', city: 'مدينة نصر', developerNotes: [] }
    ]
};
if (!DB.bookings) DB.bookings = [];
if (!DB.freeUsers) DB.freeUsers = [];
if (DB.patients) {
    const ahmed = DB.patients.find(p => p.id === '1122');
    if (ahmed && !ahmed.packagePlan) { ahmed.packagePlan = 'الباقة الماسية'; localStorage.setItem('medtrack_DB', JSON.stringify(DB)); }
    const sanaa = DB.patients.find(p => p.id === '3456');
    if (sanaa && !sanaa.packagePlan) { sanaa.packagePlan = 'الباقة البرونزية'; localStorage.setItem('medtrack_DB', JSON.stringify(DB)); }
    const zyad = DB.patients.find(p => p.id === '7777');
    if (!zyad) {
        DB.patients.push({
            id: '7777', name: 'زياد أحمد', email: 'zyad@gmail.com', password: '123', disease: 'ربو مزمن و ضعف مناعي', state: 'تحت الملاحظة', specialtyNeeded: 'أمراض صدرية ومناعة', packagePlan: 'الباقة الذهبية',
            history: 'تعرض لنوبات ربو حادة أدت إلى دخول العناية المركزة عدة مرات في 2024 و 2025. استجابة ضعيفة لموسعات الشعب التقليدية.', previousPlans: [],
            hasAllergies: true, allergyTypes: 'الغبار، حبوب اللقاح، وبعض أدوية البنسلين',
            doctorId: '9988', hospId: 'hosp001', phone: '201033333333', guardianContact: '201044444444',
            age: '29', governorate: 'الإسكندرية', city: 'سيدي بشر', coverImg: 'logo.jpg',
            homeCarePlan: [
                { id: 'ztask1', time: '07:00 صباحاً', task: 'جلستين بخار موسع للشعب (سيمبيكورت)', status: 'مكتمل' },
                { id: 'ztask2', time: '12:00 ظهراً', task: 'قياس مستوى الأكسجين في الدم (SpO2)', status: 'لم يكتمل بعد' },
                { id: 'ztask3', time: '08:00 مساءً', task: 'تناول أقراص تعزيز المناعة وحبوب الحساسية', status: 'لم يكتمل بعد' }
            ],
            hospitalCarePlan: [
                { id: 'zhtask1', time: '10:00 صباحاً', task: 'فحص وظائف الرئة الشامل (Spirometry)', status: 'مكتمل' },
                { id: 'zhtask2', time: '02:00 ظهراً', task: 'جلسة أكسجين مركزة وحقن كورتيزون تنفسي', status: 'لم يكتمل بعد' }
            ],
            postCarePlan: [
                { id: 'zptask1', time: 'شهرياً', task: 'مراجعة أرقام مقياس ذروة الجريان (Peak Flow)', status: 'لم يكتمل بعد' },
                { id: 'zptask2', time: 'أسبوعياً', task: 'الابتعاد تماماً عن التيارات الباردة والأتربة', status: 'مكتمل' }
            ],
            drNotes: [
                { drName: 'د. محمود سعيد', date: 'تحديث حالة', text: 'زياد يحتاج إلى أكسجين احتياطي بالمنزل تحسباً لأي أزمة مفاجئة.' },
                { drName: 'د. محمود سعيد', date: 'تنبيه أدوية', text: 'ممنوع صرف أي مسكنات عادية، فقط باراسيتامول لتفادي تحسس الصدر.' }
            ],
            adminNotes: [
                'تم ترقية باقة زياد إلى الباقة الذهبية لضمان كشف طوارئ منزلي في غضون ساعتين.',
                'تم ربط رقمه مباشرة بسيارة الإسعاف الخاصة بالمستشفى.'
            ]
        });
        localStorage.setItem('medtrack_DB', JSON.stringify(DB));
    }
}

// Backward compatibility for DB test users loaded from localstorage
if (DB.patients) {
    let ahmed = DB.patients.find(p => p.id === '1122');
    if (ahmed && !ahmed.email) { ahmed.email = 'ahmed@gmail.com'; ahmed.password = '123'; }
    let sanaa = DB.patients.find(p => p.id === '3456');
    if (sanaa && !sanaa.email) { sanaa.email = 'sanaa@gmail.com'; sanaa.password = '123'; }
}
if (DB.freeUsers.length === 0) {
    DB.freeUsers.push({ id: 'f1', name: 'زياد', email: 'zyad@gmail.com', password: '123', notifications: [] });
    DB.freeUsers.push({ id: 'f2', name: 'سناء', email: 'sanaa@gmail.com', password: '123', notifications: [] });
} else {
    // Force override for cached tester email to match user request
    const oldF1 = DB.freeUsers.find(u => u.email === 'ahmed@gmail.com');
    if (oldF1) { oldF1.email = 'zyad@gmail.com'; oldF1.name = 'زياد'; localStorage.setItem('medtrack_DB', JSON.stringify(DB)); }
}

document.addEventListener('DOMContentLoaded', () => {
    const initialAuthScreen = document.getElementById('initial-auth-screen');
    const loginScreen = document.getElementById('login-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    const adminDashboardScreen = document.getElementById('admin-dashboard-screen');
    const doctorDashboardScreen = document.getElementById('doctor-dashboard-screen');
    const hospitalDashboardScreen = document.getElementById('hospital-dashboard-screen');
    const globalCornerMenu = document.getElementById('global-corner-menu');

    const logoutBtns = document.querySelectorAll('.logout-btn');
    let currentLoginRole = localStorage.getItem('medtrack_role') || null;
    let loggedInUserId = localStorage.getItem('medtrack_uid') || null;

    setTimeout(() => { // Session Auto-Restore Feature
        if (currentLoginRole === 'developer') {
            if (globalCornerMenu) globalCornerMenu.classList.add('hidden');
            showScreen(adminDashboardScreen); renderAdminDashboard();
        } else if (currentLoginRole === 'hospital') {
            loggedInUserId = 'hosp001';
            if (globalCornerMenu) globalCornerMenu.classList.add('hidden');
            showScreen(hospitalDashboardScreen); renderHospitalDashboard();
        } else if (currentLoginRole === 'doctor') {
            if (globalCornerMenu) globalCornerMenu.classList.add('hidden');
            showScreen(doctorDashboardScreen); renderDoctorDashboard();
        } else if (currentLoginRole === 'patient') {
            const pat = DB.patients.find(p => p.id === loggedInUserId);
            if (pat) {
                const displayCode = document.getElementById('display-code');
                if (displayCode) displayCode.innerText = pat.id;

                const doc = DB.doctors.find(d => d.id === pat.doctorId);
                const patientGreeting = document.getElementById('patient-greeting');
                if (patientGreeting) patientGreeting.innerText = `مرحبا (${pat.name})`;

                const displayDoctor = document.getElementById('display-doctor-info');
                if (displayDoctor && doc) {
                    displayDoctor.innerHTML = `<span style="cursor:pointer; text-decoration:underline; font-size:0.9rem;" onclick="popupDoctorAvail('${doc.id}')">مواعيد التواجد للطبيب المختص</span>`;
                }

                const coverImg = document.getElementById('patient-cover-img');
                if (coverImg && pat.coverImg) coverImg.src = pat.coverImg;

                const profImg = document.getElementById('patient-profile-img');
                const profIcon = document.getElementById('patient-default-icon');
                if (pat.profileImg) {
                    if (profImg) { profImg.src = pat.profileImg; profImg.style.display = 'block'; }
                    if (profIcon) profIcon.style.display = 'none';
                } else {
                    if (profImg) profImg.style.display = 'none';
                    if (profIcon) profIcon.style.display = 'block';
                }

                if (globalCornerMenu) globalCornerMenu.classList.add('hidden');
                showScreen(dashboardScreen);
                renderPatientDashboard(pat.id);
            }
        }
    }, 50);

    const cornerMenuBtn = document.getElementById('corner-menu-btn');
    const cornerMenuDropdown = document.getElementById('corner-menu-dropdown');

    if (cornerMenuBtn && cornerMenuDropdown) {
        cornerMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            cornerMenuDropdown.classList.toggle('hidden');
        });
        document.addEventListener('click', () => {
            if (!cornerMenuDropdown.classList.contains('hidden')) cornerMenuDropdown.classList.add('hidden');
        });
    }

    const loginModal = document.getElementById('login-modal');
    const modalSecretCode = document.getElementById('modal-secret-code');
    const modalLoginBtn = document.getElementById('modal-login-btn');

    window.openLoginModal = (role) => {
        currentLoginRole = role;
        if (role === 'developer') {
            if (globalCornerMenu) globalCornerMenu.classList.add('hidden');
            showScreen(adminDashboardScreen);
            renderAdminDashboard();
            return;
        } else if (role === 'hospital') {
            if (globalCornerMenu) globalCornerMenu.classList.add('hidden');
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

    window.closeLoginModal = () => { loginModal.classList.add('hidden'); currentLoginRole = null; };

    window.switchAuthTab = (tab) => {
        const loginBtn = document.getElementById('tab-login');
        const regBtn = document.getElementById('tab-register');
        const loginForm = document.getElementById('auth-login-form');
        const regForm = document.getElementById('auth-register-form');

        if (tab === 'login') {
            loginBtn.className = 'btn btn-primary';
            loginBtn.style.background = '';
            loginBtn.style.color = '';
            regBtn.className = 'btn btn-secondary';
            regBtn.style.background = 'var(--surface)';
            regBtn.style.color = 'var(--text-main)';
            loginForm.classList.remove('hidden');
            regForm.classList.add('hidden');
        } else {
            regBtn.className = 'btn btn-primary';
            regBtn.style.background = '';
            regBtn.style.color = '';
            loginBtn.className = 'btn btn-secondary';
            loginBtn.style.background = 'var(--surface)';
            loginBtn.style.color = 'var(--text-main)';
            regForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        }
    };

    window.goToLandingPage = () => {
        showScreen(loginScreen);
    };

    window.goToAuthScreen = () => {
        showScreen(initialAuthScreen);
    };

    const authLoginForm = document.getElementById('auth-login-form');
    if (authLoginForm) {
        authLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('auth-login-email').value.trim();
            const pass = document.getElementById('auth-login-pass').value.trim();
            const free = DB.freeUsers.find(p => p.email === email && p.password === pass);
            if (free) {
                loggedInUserId = free.email;
                currentLoginRole = 'freeUser';
                document.getElementById('free-user-name').innerText = free.name;
                document.getElementById('free-user-profile').classList.remove('hidden');
                document.getElementById('header-login-btn').classList.add('hidden');
                document.getElementById('floating-notifications').classList.remove('hidden');
                renderFreeUserNotifs(free);
                showScreen(loginScreen);
            } else alert('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
        });
    }

    const authRegisterForm = document.getElementById('auth-register-form');
    if (authRegisterForm) {
        authRegisterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('auth-reg-email').value.trim();
            const pass = document.getElementById('auth-reg-pass').value.trim();
            const name = document.getElementById('auth-reg-name').value.trim();
            const age = document.getElementById('auth-reg-age').value;
            const gender = document.getElementById('auth-reg-gender').value;
            const chronicYes = document.getElementById('auth-reg-chronic').value === 'نعم';
            const chronicDesc = document.getElementById('auth-reg-chronic-desc').value;
            const allergyYes = document.getElementById('auth-reg-allergy').value === 'نعم';
            const allergyDesc = document.getElementById('auth-reg-allergy-desc').value;

            const newFreeUser = {
                id: 'F' + Date.now(), name, email, password: pass, notifications: [],
                age, gender, chronic: chronicYes, hasAllergies: allergyYes, allergyTypes: allergyYes ? allergyDesc : '',
                disease: chronicYes ? (chronicDesc || 'مزمن') : 'لا يوجد'
            };
            DB.freeUsers.push(newFreeUser);

            alert('تم إنشاء الحساب بنجاح! يمكنك الآن تصفح المنصة وطلب اشتراك.');
            authRegisterForm.reset();

            loggedInUserId = newFreeUser.email;
            currentLoginRole = 'freeUser';

            document.getElementById('free-user-name').innerText = name;
            document.getElementById('free-user-profile').classList.remove('hidden');
            document.getElementById('floating-notifications').classList.remove('hidden');
            document.getElementById('header-login-btn').classList.add('hidden');
            showScreen(loginScreen);
        });
    }

    window.populateHospitalSelect = () => {
        const sel = document.getElementById('book-hosp');
        if (sel) {
            sel.innerHTML = '<option value="">اختر المستشفى...</option>' + DB.hospitals.map(h => `<option value="${h.id}">${h.name}</option>`).join('');
        }
    };
    window.updateHospLocation = () => {
        const hospId = document.getElementById('book-hosp').value;
        const locDiv = document.getElementById('book-hosp-location');
        if (!locDiv) return;
        if (!hospId) {
            locDiv.innerText = '';
            return;
        }
        const h = DB.hospitals.find(x => x.id === hospId);
        if (h) {
            locDiv.innerText = `العنوان: ${h.governorate || 'غير محدد'} / ${h.city || 'غير محدد'}`;
        }
    };
    populateHospitalSelect();

    window.filterHospitals = () => {
        const val = document.getElementById('book-hosp-filter').value.toLowerCase();
        const list = document.getElementById('book-hosp-list');
        const filtered = DB.hospitals.filter(h =>
            h.name.toLowerCase().includes(val) ||
            (h.governorate && h.governorate.toLowerCase().includes(val)) ||
            (h.city && h.city.toLowerCase().includes(val))
        );

        if (filtered.length === 0) {
            list.innerHTML = '<div style="padding:15px; text-align:center; color:var(--text-muted);">لا توجد مستشفيات مطابقة</div>';
            return;
        }

        list.innerHTML = filtered.map(h => `
            <div class="hosp-card" onclick="selectHosp('${h.id}', this)" style="padding: 12px 15px; margin-bottom: 5px; background: var(--surface); border-radius: 8px; cursor: pointer; border: 1px solid transparent; transition: 0.3s; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <strong style="color:var(--text-main); font-size:1.05rem;"><i class="fa-solid fa-hospital" style="color:var(--primary); margin-left:5px;"></i> ${h.name}</strong>
                    <div style="color:var(--text-muted); font-size:0.85rem; margin-top:5px;"><i class="fa-solid fa-location-dot"></i> ${h.governorate || 'غير محدد'} - ${h.city || ''}</div>
                </div>
                <i class="fa-solid fa-circle-check check-icon" style="color:#10b981; font-size:1.5rem; display:none;"></i>
            </div>
        `).join('');
    };

    window.selectHosp = (id, el) => {
        document.getElementById('book-hosp').value = id;
        document.querySelectorAll('.hosp-card').forEach(c => {
            c.style.borderColor = 'transparent';
            c.style.background = 'var(--surface)';
            c.querySelector('.check-icon').style.display = 'none';
        });
        el.style.borderColor = 'var(--primary)';
        el.style.background = 'rgba(14, 165, 233, 0.1)';
        el.querySelector('.check-icon').style.display = 'block';
    };

    window.openFreeBookingModal = () => {
        const html = `
            <div style="text-align:right;">
                <h3 style="color:#34d399; margin-bottom:15px;"><i class="fa-solid fa-calendar-check"></i> حجز موعد بالمستشفى (مجاناً)</h3>
                <form onsubmit="submitFreeBookingForm(event)">
                    <div class="input-group" style="margin-bottom: 15px;">
                        <label style="margin-bottom:10px; display:block;">اختر المستشفى أو ابحث (الاسم/المحافظة/المدينة)</label>
                        <div style="position: relative;">
                            <i class="fa-solid fa-magnifying-glass" style="position:absolute; right:15px; top:15px; color:var(--text-muted);"></i>
                            <input type="text" id="book-hosp-filter" onkeyup="filterHospitals()" placeholder="ابحث هنا..." style="width:100%; padding:12px 40px 12px 12px; margin-bottom:10px; border-radius:10px; border:2px solid var(--border); background:rgba(15,23,42,0.6); color:white; outline:none; transition:0.3s;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">
                        </div>
                        
                        <input type="hidden" id="book-hosp">
                        
                        <div id="book-hosp-list" style="max-height: 220px; overflow-y: auto; background: rgba(15,23,42,0.3); border: 1px solid var(--border); border-radius: 10px; padding: 5px;">
                        </div>
                    </div>

                    <div class="input-group" style="margin-bottom: 15px;">
                        <label>اليوم المفضل</label>
                        <input type="date" id="book-date" required>
                    </div>
                    <div class="input-group" style="margin-bottom: 15px;">
                        <label>نوع المريض</label>
                        <select id="book-type" style="width:100%; padding:12px; border-radius:10px; background:rgba(15,23,42,0.6); color:white; border:2px solid var(--border);">
                            <option value="عادي">عادي</option>
                            <option value="طوارئ">طوارئ</option>
                            <option value="رعاية خاصة">رعاية خاصة</option>
                        </select>
                    </div>
                    <div class="input-group" style="margin-bottom: 15px;">
                        <label>التخصص المطلوب</label>
                        <input type="text" id="book-specialty" placeholder="مثال: باطنة، عظام..." required>
                    </div>
                    <div class="input-group" style="margin-bottom: 15px;">
                        <label>الاسم (للتواصل)</label>
                        <input type="text" id="book-name" required>
                    </div>
                    <div class="input-group" style="margin-bottom: 20px;">
                        <label>رقم الهاتف للتواصل</label>
                        <input type="text" id="book-phone" placeholder="أدخل رقم هاتفك..." required>
                    </div>
                    <button type="submit" class="btn" style="width:100%; background:#34d399; color:white; border:none; font-size:1.1rem; padding:15px; border-radius:10px;">إرسال طلب الحجز مجاناً</button>
                </form>
            </div>
        `;
        openDynamicModal(html);
        setTimeout(filterHospitals, 10);
    };

    window.submitFreeBookingForm = (e) => {
        e.preventDefault();
        const hospId = document.getElementById('book-hosp').value;
        const date = document.getElementById('book-date').value;
        const type = document.getElementById('book-type').value;
        const spec = document.getElementById('book-specialty').value;
        const name = document.getElementById('book-name').value;
        const phone = document.getElementById('book-phone').value;

        if (!hospId) return alert('الرجاء اختيار المستشفى أولاً');

        if (!DB.bookings) DB.bookings = [];
        const newBooking = {
            id: 'B' + Date.now(),
            hospId, date, type, specialty: spec, patientName: name, phone, status: 'pending', time: '', freeUserId: currentLoginRole === 'freeUser' ? loggedInUserId : null
        };
        DB.bookings.push(newBooking);
        alert('تم إرسال طلب الحجز مجاناً إلى المستشفى! سيتم الرد عليك قريباً بتحديد الساعة المتاحة.');
        closeDynamicModal();
    };

    window.uploadFreeUserImg = (input) => {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('free-user-img').src = e.target.result;
                if (currentLoginRole === 'freeUser') {
                    const free = DB.freeUsers.find(x => x.email === loggedInUserId);
                    if (free) free.profileImg = e.target.result;
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    };

    window.saveNotif = (idStr) => {
        if (currentLoginRole === 'freeUser') {
            const free = DB.freeUsers.find(x => x.email === loggedInUserId);
            if (free) {
                const n = free.notifications.find(x => x.id === idStr);
                if (n) { n.isRead = true; localStorage.setItem('medtrack_DB', JSON.stringify(DB)); renderFreeUserNotifs(free); }
            }
        }
    };

    window.deleteNotif = (idStr) => {
        if (currentLoginRole === 'freeUser') {
            const free = DB.freeUsers.find(x => x.email === loggedInUserId);
            if (free) {
                free.notifications = free.notifications.filter(n => n.id !== idStr);
                localStorage.setItem('medtrack_DB', JSON.stringify(DB));
                renderFreeUserNotifs(free);
            }
        }
    };

    window.renderFreeUserNotifs = (free) => {
        const badge = document.getElementById('free-user-notif-badge');
        const list = document.getElementById('free-user-notif-list');

        const unreadCount = free.notifications ? free.notifications.filter(n => !n.isRead).length : 0;

        if (badge) {
            if (unreadCount === 0) badge.classList.add('hidden');
            else {
                badge.classList.remove('hidden');
                badge.innerText = unreadCount;
            }
        }

        if (!free.notifications || free.notifications.length === 0) {
            if (list) list.innerHTML = '<div style="text-align:center; padding:10px;">لا توجد إشعارات حالياً.</div>';
        } else {
            if (list) {
                const sorted = [...free.notifications].sort((a, b) => (a.isRead === b.isRead) ? 0 : a.isRead ? 1 : -1);
                list.innerHTML = sorted.map(n => `
                    <div style="padding:15px; border-bottom:1px solid var(--border); display:flex; flex-direction:column; gap:10px; background:${n.isRead ? 'transparent' : 'rgba(14, 165, 233, 0.1)'};">
                        <div style="font-size:0.95rem; color:${n.isRead ? 'var(--text-muted)' : 'white'}; line-height:1.5;">${n.text}</div>
                        <div style="display:flex; justify-content:flex-end; gap:10px;">
                            ${!n.isRead ? `<button onclick="saveNotif('${n.id}')" style="background:#34d399; border:none; color:#000; font-weight:bold; padding:5px 10px; border-radius:5px; cursor:pointer; font-size:0.8rem;"><i class="fa-solid fa-floppy-disk"></i> حفظ بملفي</button>` : `<span style="background:transparent; border:none; color:var(--text-muted); font-size:0.8rem;"><i class="fa-solid fa-check-double"></i> محفوظة</span>`}
                            <button onclick="deleteNotif('${n.id}')" style="background:transparent; border:1px solid var(--danger); color:var(--danger); padding:4px 10px; border-radius:5px; cursor:pointer; font-size:0.8rem;"><i class="fa-solid fa-trash"></i> حذف</button>
                        </div>
                    </div>
                `).join('');
            }
        }
    };

    if (modalLoginBtn) modalLoginBtn.addEventListener('click', performModalLogin);
    if (modalSecretCode) modalSecretCode.addEventListener('keypress', (e) => { if (e.key === 'Enter') performModalLogin(); });

    function performModalLogin() {
        if (!currentLoginRole) return;
        const code = modalSecretCode.value.trim();
        if (code === '') return alert('يرجى إدخال الكود السري');

        if (currentLoginRole === 'doctor') {
            const doc = DB.doctors.find(d => d.code === code);
            if (doc) {
                loggedInUserId = doc.id;
                closeLoginModal();
                if (globalCornerMenu) globalCornerMenu.classList.add('hidden');
                showScreen(doctorDashboardScreen);
                renderDoctorDashboard();
            } else alert('كود الطبيب غير صحيح.');
        }
    }

    const patientCodeInput = document.getElementById('patient-code-input');
    const patientLoginBtn = document.getElementById('patient-login-btn');
    const displayCode = document.getElementById('display-code');
    const displayDoctor = document.getElementById('display-doctor-info');
    const patientGreeting = document.getElementById('patient-greeting');

    if (patientLoginBtn) {
        patientLoginBtn.addEventListener('click', () => {
            const code = patientCodeInput.value.trim();
            const pat = DB.patients.find(p => p.id === code);
            if (pat) {
                loggedInUserId = pat.id;
                if (displayCode) displayCode.innerText = pat.id;

                const doc = DB.doctors.find(d => d.id === pat.doctorId);
                if (patientGreeting) {
                    patientGreeting.innerText = `مرحبا (${pat.name})`;
                }

                if (displayDoctor && doc) {
                    displayDoctor.innerHTML = `<span style="cursor:pointer; text-decoration:underline; font-size:0.9rem;" onclick="popupDoctorAvail('${doc.id}')">مواعيد التواجد للطبيب المختص</span>`;
                }

                // Update Cover Image for patient
                const coverImg = document.getElementById('patient-cover-img');
                if (coverImg && pat.coverImg) coverImg.src = pat.coverImg;

                // Update Profile Image
                const profImg = document.getElementById('patient-profile-img');
                const profIcon = document.getElementById('patient-default-icon');
                if (pat.profileImg) {
                    if (profImg) { profImg.src = pat.profileImg; profImg.style.display = 'block'; }
                    if (profIcon) profIcon.style.display = 'none';
                } else {
                    if (profImg) profImg.style.display = 'none';
                    if (profIcon) profIcon.style.display = 'block';
                }

                if (globalCornerMenu) globalCornerMenu.classList.add('hidden');
                showScreen(dashboardScreen);
                renderPatientDashboard(pat.id);
            } else alert('كود مريض غير مقيد بالنظام.');
        });
    }

    const coverInput = document.getElementById('cover-img-upload');
    if (coverInput) {
        coverInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    document.getElementById('patient-cover-img').src = ev.target.result;
                    const pat = DB.patients.find(p => p.id === loggedInUserId);
                    if (pat) { pat.coverImg = ev.target.result; alert('تم تغيير صورة الغلاف بنجاح'); }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const profileUpload = document.getElementById('profile-img-upload');
    if (profileUpload) {
        profileUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const r = new FileReader();
                r.onload = (ev) => {
                    const img = document.getElementById('patient-profile-img');
                    const icon = document.getElementById('patient-default-icon');
                    if (img) { img.src = ev.target.result; img.style.display = 'block'; }
                    if (icon) icon.style.display = 'none';

                    const pat = DB.patients.find(x => x.id === loggedInUserId);
                    if (pat) pat.profileImg = ev.target.result;
                }
                r.readAsDataURL(file);
            }
        });
    }

    const fileUpload = document.getElementById('medical-file-upload');
    if (fileUpload) {
        fileUpload.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                const pat = DB.patients.find(x => x.id === loggedInUserId);
                if (pat) {
                    if (!pat.files) pat.files = [];
                    let readersCount = 0;
                    for (let i = 0; i < e.target.files.length; i++) {
                        const file = e.target.files[i];
                        const r = new FileReader();
                        r.onload = (ev) => {
                            pat.files.push({ name: file.name, data: ev.target.result });
                            readersCount++;
                            if (readersCount === e.target.files.length) {
                                renderPatientFiles(pat);
                                alert('تم رفع الملف بنجاح!');
                            }
                        }
                        r.readAsDataURL(file);
                    }
                }
            }
        });
    }

    window.renderPatientFiles = (p) => {
        const list = document.getElementById('uploaded-files-list');
        if (!list) return;
        if (!p.files || p.files.length === 0) {
            list.innerHTML = '<p style="grid-column:1/-1;">لا توجد ملفات مرفوعة.</p>';
            return;
        }
        list.innerHTML = p.files.map((f, i) => `
            <div style="border:1px solid var(--border); padding:10px; border-radius:10px; text-align:center;">
                <i class="fa-solid fa-file-medical" style="font-size:2rem; color:var(--primary); margin-bottom:10px;"></i>
                <p style="font-size:0.9rem; overflow:hidden; text-overflow:ellipsis; direction:ltr; white-space:nowrap; cursor:pointer;" onclick="viewFile('${f.data}')">${f.name}</p>
            </div>
        `).join('');
    };

    window.viewFile = (data) => {
        const w = window.open();
        if (w) w.document.write('<iframe src="' + data + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
    };

    const docCoverInput = document.getElementById('doc-cover-img-upload');
    if (docCoverInput) {
        docCoverInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    const img = document.getElementById('doctor-cover-img');
                    if (img) img.src = ev.target.result;
                    alert('تم تغيير غلاف الطبيب بنجاح للواجهة الحالية'); // Just front-end simulation
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const dynamicModal = document.getElementById('dynamic-glass-modal');
    const dynamicModalContent = document.getElementById('dynamic-modal-content');

    window.openDynamicModal = (htmlContent) => {
        dynamicModalContent.innerHTML = htmlContent;
        dynamicModal.classList.remove('hidden');
    };
    window.closeDynamicModal = () => { dynamicModal.classList.add('hidden'); dynamicModalContent.innerHTML = ''; };

    // Package Registration specific
    window.openPackageDataModal = (pkgName) => {
        const html = `
            <div style="text-align:right;">
                <h3 style="color:var(--primary); margin-bottom:15px;"><i class="fa-solid fa-file-signature"></i> استمارة الاشتراك: ${pkgName}</h3>
                
                <div class="form-group"><label>الاسم الكامل</label><input type="text" id="pkg-name"></div>
                <div class="form-row">
                    <div class="form-group"><label>السن</label><input type="number" id="pkg-age"></div>
                    <div class="form-group"><label>النوع</label><select id="pkg-gender"><option value="ذكر">ذكر</option><option value="أنثى">أنثى</option></select></div>
                </div>

                <div class="form-group" style="margin-bottom:15px;">
                    <label>هل لديك مرض مزمن؟</label>
                    <select id="pkg-chronic" style="width:100%; padding:12px; border-radius:10px; background:rgba(15,23,42,0.6); color:white; border:2px solid var(--border);" onchange="document.getElementById('pkg-chronic-desc').style.display=this.value==='نعم'?'block':'none'">
                        <option value="لا">لا</option><option value="نعم">نعم</option>
                    </select>
                    <input type="text" id="pkg-chronic-desc" placeholder="اذكر الأمراض المزمنة..." style="display:none; margin-top:10px;">
                </div>

                <div class="form-group" style="margin-bottom:20px;">
                    <label>هل تعاني من حساسية؟</label>
                    <select id="pkg-allergy" style="width:100%; padding:12px; border-radius:10px; background:rgba(15,23,42,0.6); color:white; border:2px solid var(--border);" onchange="document.getElementById('pkg-allergy-desc').style.display=this.value==='نعم'?'block':'none'">
                        <option value="لا">لا</option><option value="نعم">نعم</option>
                    </select>
                    <input type="text" id="pkg-allergy-desc" placeholder="اذكر نوع الحساسية..." style="display:none; margin-top:10px;">
                </div>

                <div class="form-group"><label>طريقة الدفع</label>
                    <select id="pkg-payment-method" style="width:100%; padding:15px; border-radius:10px; background:rgba(15,23,42,0.6); color:white; border:2px solid var(--border);" onchange="updatePaymentDummy()">
                        <option value="">اختر طريقة الدفع</option>
                        <option value="فودافون كاش">فودافون كاش</option>
                        <option value="انستا باي">انستا باي</option>
                        <option value="حساب بنكي">حساب بنكي</option>
                    </select>
                    <div id="pkg-payment-dummy" style="margin-top:10px; font-size:0.9rem; color:#34d399;"></div>
                </div>

                <div class="form-group">
                    <label>صورة التحويل (إيصال الدفع)</label>
                    <input type="file" id="pkg-payment-receipt" accept="image/*" style="width:100%; padding:10px; background:transparent;">
                </div>
                
                <button class="btn btn-primary" onclick="submitPackageForm('${pkgName}')" style="width:100%; justify-content:center; padding:15px; font-size:1.1rem;"><i class="fa-solid fa-paper-plane"></i> تأكيد وإرسال الطلب للمطور</button>
            </div>
        `;
        openDynamicModal(html);
    };

    window.updatePaymentDummy = () => {
        const p = document.getElementById('pkg-payment-method').value;
        const d = document.getElementById('pkg-payment-dummy');
        if (p === 'فودافون كاش') d.innerHTML = 'الرجاء التحويل على الرقم: <b>01099998888</b>';
        else if (p === 'انستا باي') d.innerHTML = 'الرجاء التحويل على الحساب: <b>medtrack@instapay</b>';
        else if (p === 'حساب بنكي') d.innerHTML = 'حساب الجمعية المصرية رقم: <b>1234567891011</b> (بنك مصر)';
        else d.innerHTML = '';
    };

    window.submitPackageForm = (pkgName) => {
        const name = document.getElementById('pkg-name').value;
        const payment = document.getElementById('pkg-payment-method').value;
        const age = document.getElementById('pkg-age').value;
        const gender = document.getElementById('pkg-gender').value;
        const chronicYes = document.getElementById('pkg-chronic').value === 'نعم';
        const chronicDesc = document.getElementById('pkg-chronic-desc').value;
        const allergyYes = document.getElementById('pkg-allergy').value === 'نعم';
        const allergyDesc = document.getElementById('pkg-allergy-desc').value;

        if (!name || !payment) return alert('الرجاء إدخال الاسم وطريقة الدفع');

        const fileInput = document.getElementById('pkg-payment-receipt');

        const sendData = (receiptBase64) => {
            if (!DB.packageRequests) DB.packageRequests = [];
            DB.packageRequests.push({
                id: 'REQ' + Date.now(),
                pkgName,
                name, age, gender, chronic: chronicYes, chronicDesc, hasAllergies: allergyYes, allergyDesc,
                freeUserId: currentLoginRole === 'freeUser' ? loggedInUserId : null,
                paymentMethod: payment,
                receipt: receiptBase64,
                status: 'pending'
            });

            closeDynamicModal();

            // Show notification modal
            const msgDiv = document.createElement('div');
            msgDiv.className = 'glass-card fade-in';
            msgDiv.style = "position:fixed; top:20px; left:50%; transform:translateX(-50%); z-index:99999; padding:20px; text-align:center; box-shadow:0 0 20px rgba(45,212,191,0.5); border-color:var(--accent);";
            msgDiv.innerHTML = `<h3 style="color:var(--accent); margin:0;">تم ارسال البيانات وسيتم التاكيد قريباً</h3>`;
            document.body.appendChild(msgDiv);
            setTimeout(() => msgDiv.remove(), 4000);
        };

        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => sendData(e.target.result);
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            sendData('');
        }
    };

    window.requestNotification = () => {
        if (!("Notification" in window)) alert("متصفحك الحالي لا يدعم إشعارات النظام.");
        else if (Notification.permission === "granted") {
            const n = new Notification('MedTrack', { body: 'تمت مزامنة الإشعارات والربط مع الهاتف مسبقاً بنجاح!' });
            setTimeout(() => n.close(), 3000);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") new Notification('MedTrack', { body: 'تم تفعيل ربط إشعارات الهاتف بنجاح!' });
            });
        }
    };

    window.popupDoctorAvail = (docId) => {
        const doc = DB.doctors.find(d => d.id === docId);
        if (!doc) return;
        const html = `<div style="text-align:center;"><h2 style="color:var(--primary); margin-bottom:20px;">مواعيد تواجد ${doc.name}</h2>
            <div class="glass-card" style="padding:20px;">
                <ul style="list-style:none; padding:0; font-size:1.1rem; line-height:2;">
                    ${doc.availability.map(v => `<li><i class="fa-regular fa-clock" style="color:var(--secondary);"></i> ${v}</li>`).join('')}
                </ul>
            </div></div>`;
        openDynamicModal(html);
    };

    window.patientFilterDocs = () => {
        const spec = document.getElementById('pat-dash-spec').value;
        const docSel = document.getElementById('pat-dash-doc');
        if (!docSel) return;
        const docs = DB.doctors.filter(d => spec === '' || d.specialty === spec);
        docSel.innerHTML = '<option value="">اختر الطبيب المتوفر...</option>' + docs.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
    };

    window.savePatientDoctor = () => {
        const pat = DB.patients.find(x => x.id === loggedInUserId);
        const spec = document.getElementById('pat-dash-spec').value;
        const docId = document.getElementById('pat-dash-doc').value;
        if (!pat || !spec || !docId) return alert('الرجاء اختيار القسم والطبيب أولاً');
        pat.specialtyNeeded = spec;
        pat.doctorId = docId;
        alert('تم تأكيد الاختيار.. يمكنك الآن التواصل مع طبيبك!');

        // Update greeting
        const doc = DB.doctors.find(d => d.id === docId);
        const patientGreeting = document.getElementById('patient-greeting');
        const displayDoctor = document.getElementById('display-doctor-info');
        if (patientGreeting) {
            patientGreeting.innerText = `مرحبا (${pat.name})`;
        }
        if (displayDoctor && doc) {
            displayDoctor.innerHTML = `<span style="cursor:pointer; text-decoration:underline; font-size:0.9rem; color:var(--primary-light);" onclick="popupDoctorAvail('${doc.id}')">عرض مواعيد عمل (${doc.name})</span>`;
        }
        renderPatientDashboard(pat.id);
    };

    function renderPatientDashboard(id) {
        const p = DB.patients.find(x => x.id === id);
        if (!p) return;

        const renderStatus = (s) => `<span class="status ${s === 'مكتمل' ? 'completed' : 'pending'}">${s}</span>`;

        const specSel = document.getElementById('pat-dash-spec');
        if (specSel) {
            const specs = [...new Set(DB.doctors.map(d => d.specialty))];
            specSel.innerHTML = '<option value="">اختر القسم...</option>' + specs.map(s => `<option value="${s}" ${s === p.specialtyNeeded ? 'selected' : ''}>${s}</option>`).join('');
            patientFilterDocs();
            if (p.doctorId) {
                const docSel = document.getElementById('pat-dash-doc');
                if (docSel) docSel.value = p.doctorId;
            }
        }

        const notesContainer = document.getElementById('patient-dr-notes');
        if (notesContainer) {
            let notesHTML = '';
            if (p.drNotes.length) {
                notesHTML += p.drNotes.map(n => `
                    <div class="note-item">
                        <div class="note-meta"><span class="dr-name"><i class="fa-solid fa-user-md"></i> ${n.drName}</span><span class="note-date">${n.date}</span></div>
                        <div class="note-body"><p>${n.text}</p></div>
                    </div>`).join('');
            }
            if (p.adminNotes.length) {
                notesHTML += p.adminNotes.map(n => `
                    <div class="note-item" style="background:rgba(234, 179, 8, 0.1); border-right-color:var(--warning);">
                        <div class="note-meta text-main"><span class="dr-name"><i class="fa-solid fa-crown"></i> الإدارة ومسؤول النظام</span><span class="note-date">تعليم جديد</span></div>
                        <div class="note-body"><p>${n}</p></div>
                    </div>`).join('');
            }
            notesContainer.innerHTML = notesHTML || '<p class="text-center" style="padding:20px;">لا توجد ملاحظات طبية أو إدارية حالياً.</p>';
        }

        const docObj = DB.doctors.find(d => d.id === p.doctorId);
        const drWaBtn = document.getElementById('patient-dr-wa-btn');
        if (drWaBtn && docObj && docObj.phone) drWaBtn.href = `https://wa.me/${docObj.phone}?text=MedTrack: أود التواصل مع الطبيب بخصوص حالتي`;

        const hcContainer = document.getElementById('patient-homecare-table');
        if (hcContainer) {
            hcContainer.innerHTML = p.homeCarePlan.length ? p.homeCarePlan.map(n => `
                <tr><td>${n.time}</td><td>${n.task}</td><td>${renderStatus(n.status)}</td></tr>
            `).join('') : '<tr><td colspan="3" class="text-center">لا توجد مسارات مسجلة للمنزل</td></tr>';
        }

        const hospContainer = document.getElementById('patient-hospital-timeline');
        if (hospContainer) {
            hospContainer.innerHTML = p.hospitalCarePlan.length ? p.hospitalCarePlan.map(n => `
                <div class="timeline-item"><div class="time">${n.time}</div>
                <div class="task-det"><h4>${n.task}</h4><p>الحالة: ${renderStatus(n.status)}</p></div></div>
            `).join('') : '<p>لا توجد مسارات مسجلة للمستشفى.</p>';
        }

        const pcContainer = document.getElementById('patient-postcare-table');
        if (pcContainer) {
            pcContainer.innerHTML = p.postCarePlan.length ? p.postCarePlan.map(n => `
                <tr><td>${n.time}</td><td>${n.task}</td><td>${renderStatus(n.status)}</td></tr>
            `).join('') : '<tr><td colspan="3" class="text-center">لا توجد مهام للمتابعة</td></tr>';
        }

        if (window.renderPatientFiles) window.renderPatientFiles(p);
    }

    const requestCareForm = document.getElementById('care-request-form');
    if (requestCareForm) requestCareForm.addEventListener('submit', (e) => { e.preventDefault(); /* ... */ });

    // Doctor Dashboard
    function renderDoctorDashboard() {
        const d = DB.doctors.find(x => x.id === loggedInUserId);
        if (!d) return;

        const docGreeting = document.getElementById('doc-greeting');
        const docSpecialty = document.getElementById('doc-specialty-display');
        if (docGreeting) docGreeting.innerText = `مرحباً د. ${d.name}`;
        if (docSpecialty) docSpecialty.innerText = d.specialty;

        const patTable = document.getElementById('doc-patients-table-body');
        if (patTable) {
            const drPatients = DB.patients.filter(p => p.doctorId === d.id);
            if (drPatients.length > 0) {
                patTable.innerHTML = drPatients.map(p => {
                    const latestDate = p.drNotes.length > 0 ? p.drNotes[0].date : 'لم يتم البدء';
                    return `<tr><td>${p.name}</td><td>${latestDate}</td><td><span class="status ${p.state === 'مستقر' ? 'completed' : 'pending'}">${p.state}</span></td></tr>`;
                }).join('');
            } else {
                patTable.innerHTML = '<tr><td colspan="3" style="text-align:center;">لا يوجد مرضى مقيدين حالياً لهذا التخصص.</td></tr>';
            }
        }

        const availContainer = document.getElementById('doctor-availability-list');
        if (availContainer) availContainer.innerHTML = d.availability.length ? d.availability.map(a => `<div class="note-item" style="margin-bottom:10px; border-right:4px solid var(--primary); padding:10px;"><div style="font-weight:bold;"><i class="fa-regular fa-clock"></i> ${a}</div></div>`).join('') : '<p>لم يتم تسجيل أوقات.</p>';

        const devNotesContainer = document.getElementById('doctor-dev-notes-list');
        if (devNotesContainer) devNotesContainer.innerHTML = d.developerNotes.length ? d.developerNotes.map(n => `<div class="note-item" style="background:rgba(234, 179, 8, 0.1); border-right:4px solid var(--warning); margin-bottom:15px;"><div style="font-weight:bold; color:var(--text-main); margin-bottom:5px;"><i class="fa-solid fa-user-shield"></i> تعليم إداري:</div><div>${n}</div></div>`).join('') : '<p>لا توجد تعليمات.</p>';
    }

    const docReportForm = document.getElementById('doctor-report-form');
    if (docReportForm) docReportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pid = document.getElementById('doc-patient-code').value.trim();
        const note = document.getElementById('doc-patient-note').value.trim();
        const p = DB.patients.find(x => x.id === pid);
        if (!p) return alert('كود غير متوفر!');
        p.drNotes.unshift({ drName: DB.doctors.find(x => x.id === loggedInUserId).name, date: new Date().toLocaleDateString(), text: note });
        alert(`تم الإرسال بنجاح`); docReportForm.reset();
    });

    // Unified CRUD logic
    const renderTable = (items, cols, actionHtmlFn) => {
        if (!items || !items.length) return '<p>لايوجد بينات.</p>';
        let html = `<table style="width:100%; text-align:right;"><thead><tr>${cols.map(c => `<th>${c}</th>`).join('')}<th>إجراء</th></tr></thead><tbody>`;
        html += items.map(itr => `<tr>${actionHtmlFn(itr)}</tr>`).join('');
        return html + '</tbody></table>';
    };

    window.deletePatient = (id) => {
        if (confirm('هل أنت متأكد من حذف المريض بالكامل من المنظومة؟')) {
            DB.patients = DB.patients.filter(x => x.id !== id);
            renderAdminDashboard(); alert('تم الحذف'); closeDynamicModal();
        }
    };
    window.deleteDoctor = (id) => {
        if (confirm('هل أنت متأكد من حذف الطبيب؟')) { DB.doctors = DB.doctors.filter(x => x.id !== id); renderAdminDashboard(); }
    };
    window.deleteHospital = (id) => {
        if (confirm('هل متأكد من حذف المشفى؟')) { DB.hospitals = DB.hospitals.filter(x => x.id !== id); renderAdminDashboard(); }
    };

    window.renderAdminDashboard = () => {
        if (!DB.packageRequests) DB.packageRequests = [];
        const subsContainer = document.getElementById('admin-subscriptions-list');
        if (subsContainer) {
            let pending = DB.packageRequests.filter(r => r.status === 'pending');
            subsContainer.innerHTML = pending.length ? pending.map(r => `
                <div class="glass-card" style="padding:15px; margin-bottom:15px; border-right:4px solid var(--accent);">
                    <h4>طلباشتراك باقة: ${r.pkgName} | طالب الاشتراك: ${r.name}</h4>
                    <p style="margin:5px 0;">طريقة الدفع: <strong style="color:var(--primary);">${r.paymentMethod}</strong></p>
                    <div style="margin-top:10px;">
                        ${r.receipt ? `<button class="btn btn-secondary" onclick="viewFile('${r.receipt}')" style="margin-left:10px; font-size:0.9rem;">عرض صورة التحويل</button>` : ''}
                        <button class="btn btn-primary" onclick="adminApproveSubscription('${r.id}')" style="font-size:0.9rem;">تأكيد الطلب وإنشاء حساب</button>
                    </div>
                </div>
            `).join('') : '<p>لا توجد اشتراكات جديدة حالياً.</p>';
        }

        document.getElementById('admin-patient-count').innerText = `إجمالي المرضى: ${DB.patients.length}`;
        document.getElementById('admin-patient-list').innerHTML = renderTable(DB.patients, ['الكود', 'الاسم', 'الباقة', 'الحالة'], p => `
            <td>${p.id}</td><td>${p.name}</td><td>${p.packagePlan || 'لا يوجد'}</td><td>${p.state}</td>
            <td>
                <button class="btn btn-primary" style="padding:5px 10px; font-size:0.9rem;" onclick="openUnifiedPatientModal('${p.id}', 'admin')">عرض وتعديل</button>
                <button class="btn btn-danger-outline" style="padding:5px 10px; font-size:0.9rem;" onclick="deletePatient('${p.id}')"><i class="fa-solid fa-trash"></i></button>
            </td>
        `);

        document.getElementById('admin-doctor-count').innerText = `إجمالي الأطباء: ${DB.doctors.length}`;
        document.getElementById('admin-doctor-list').innerHTML = renderTable(DB.doctors, ['الطبيب', 'الكود', 'التخصص'], d => `
            <td>${d.name}</td><td>${d.code}</td><td>${d.specialty}</td>
            <td><button class="btn btn-danger-outline" style="padding:5px 10px; font-size:0.9rem;" onclick="deleteDoctor('${d.id}')"><i class="fa-solid fa-trash"></i></button></td>
        `);

        const hContainer = document.getElementById('admin-hospital-list');
        if (hContainer) hContainer.innerHTML = renderTable(DB.hospitals, ['المستشفى', 'الكود'], h => `
            <td>${h.name}</td><td>${h.id}</td>
            <td><button class="btn btn-danger-outline" style="padding:5px 10px; font-size:0.9rem;" onclick="deleteHospital('${h.id}')"><i class="fa-solid fa-trash"></i></button></td>
        `);

    };

    window.adminAddNewPatient = () => {
        const name = document.getElementById('add-pat-name').value;
        const code = document.getElementById('add-pat-code').value;
        const phone = document.getElementById('add-pat-phone').value;
        const age = document.getElementById('add-pat-age').value;
        const gov = document.getElementById('add-pat-gov').value;
        const city = document.getElementById('add-pat-city').value;
        const guardian = document.getElementById('add-pat-guardian').value;
        const allergy = document.getElementById('add-pat-allergy').value;

        if (!name || !code || !phone) return alert('البيانات الأساسية غير مكتملة (الاسم، الهاتف، والكود السري)');
        DB.patients.push({
            id: code, name, disease: 'جديد', state: 'مستقر', specialtyNeeded: 'غير محدد',
            history: '', previousPlans: [], hasAllergies: !!allergy, allergyTypes: allergy, doctorId: '', hospId: 'hosp001',
            phone, guardianContact: guardian, age, governorate: gov, city, coverImg: 'logo.jpg',
            homeCarePlan: [], hospitalCarePlan: [], postCarePlan: [], drNotes: [], adminNotes: []
        });
        alert('تم تسجيل المريض بنجاح!');
        renderAdminDashboard();
        document.getElementById('add-pat-name').value = '';
        document.getElementById('add-pat-code').value = '';
        document.getElementById('add-pat-phone').value = '';
        document.getElementById('add-pat-age').value = '';
        document.getElementById('add-pat-gov').value = '';
        document.getElementById('add-pat-city').value = '';
        document.getElementById('add-pat-guardian').value = '';
        document.getElementById('add-pat-allergy').value = '';
    };

    window.adminApproveSubscription = (reqId) => {
        const req = DB.packageRequests.find(r => r.id === reqId);
        if (!req) return;

        const newCode = Math.floor(1000 + Math.random() * 9000).toString();

        DB.patients.push({
            id: newCode, name: req.name, email: req.freeUserId || '', password: '',
            disease: req.chronic ? (req.chronicDesc || 'مزمن') : 'لا يوجد', state: 'مستقر', specialtyNeeded: 'غير محدد', history: '',
            previousPlans: [], doctorId: '', hospId: '', phone: '', guardianContact: '',
            age: req.age || '', governorate: '', city: '', coverImg: 'logo.jpg', profileImg: '', files: [],
            hasAllergies: req.hasAllergies || false, allergyTypes: req.allergyDesc || '',
            packagePlan: req.pkgName,
            homeCarePlan: [], hospitalCarePlan: [], postCarePlan: [], drNotes: [], adminNotes: []
        });

        req.status = 'approved';
        renderAdminDashboard();

        if (req.freeUserId) {
            const freeU = DB.freeUsers.find(u => u.email === req.freeUserId);
            if (freeU) {
                freeU.notifications.push({ id: 'N' + Date.now(), text: `تم تأكيد اشتراكك في باقة ${req.pkgName} بنجاح! كود مرورك السري للملف الطبي هو: ${newCode}` });
            }
        }
        localStorage.setItem('medtrack_DB', JSON.stringify(DB));

        const msgDiv = document.createElement('div');
        msgDiv.className = 'glass-card fade-in';
        msgDiv.style = "position:fixed; top:20px; left:50%; transform:translateX(-50%); z-index:99999; padding:20px 40px; text-align:center; background:rgba(16,185,129,0.9); box-shadow:0 0 20px rgba(16,185,129,0.5); border:1px solid #10b981; color:white;";
        msgDiv.innerHTML = `<h3 style="margin-bottom:10px; color:white;">إشعار المطور</h3>
                            <p style="font-size:1.1rem; color:white;">تم تأكيد الاشتراك وتم إرسال الكود (${newCode}) لإشعارات المستخدم المجاني.</p>`;
        document.body.appendChild(msgDiv);
        setTimeout(() => msgDiv.remove(), 10000);
    };

    window.toggleTaskStatus = (pId, listType, taskId) => {
        const p = DB.patients.find(x => x.id === pId);
        if (!p) return;
        let list = p[listType];
        let task = list.find(t => t.id === taskId);
        if (task) { task.status = (task.status === 'مكتمل' ? 'لم يكتمل بعد' : 'مكتمل'); }
        openUnifiedPatientModal(pId, loggedInUserId === 'hosp001' ? 'hospital' : 'admin');
    };

    window.openUnifiedPatientModal = (id, role) => {
        const p = DB.patients.find(x => x.id === id);
        if (!p) return;

        const renderTasks = (list, typeId) => {
            return list.length ? list.map(t => `
                <div class="plan-item">
                    <div>
                        <div style="font-weight:bold; color:var(--primary);">${t.task} <span style="font-size:0.8rem; color:#888;">(${t.time})</span></div>
                        <div style="font-size:0.9rem;">الحالة: <span style="color:${t.status === 'مكتمل' ? 'green' : 'red'}">${t.status}</span></div>
                    </div>
                    <div class="crud-btns">
                        ${(role === 'admin' || role === 'hospital') ? `<button class="btn btn-${t.status === 'مكتمل' ? 'danger-outline' : 'primary'}" style="padding:5px 10px; font-size:0.8rem;" onclick="toggleTaskStatus('${p.id}','${typeId}','${t.id}')">${t.status === 'مكتمل' ? 'تراجع' : 'إكمال'}</button>` : ''}
                        ${role === 'admin' ? `<button class="btn btn-danger-outline" style="padding:5px 10px; font-size:0.8rem;" onclick="deleteTask('${p.id}','${typeId}','${t.id}')">حذف</button>` : ''}
                    </div>
                </div>
            `).join('') : '<p>لا يوجد.</p>';
        };

        const doc = DB.doctors.find(d => d.id === p.doctorId);
        const docName = doc ? doc.name : 'غير محدد';

        const html = `
            <div class="unified-pat-modal">
                <h2 style="color:var(--primary); margin-bottom:10px;">الملف السريري: ${p.name}</h2>
                <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:20px;">كود المريض: ${p.id} | التخصص المطلوب: ${p.specialtyNeeded} | المعالج: ${docName} | العمر: ${p.age || '--'}</div>
                
                <div class="history-box">
                    <h3 style="font-size:1.1rem; margin-bottom:5px;"><i class="fa-solid fa-clock-rotate-left"></i> السجل المرضي السابق</h3>
                    <p style="font-size:0.95rem;">${p.history || 'لا يوجد سجل مرضي مسجل'}</p>
                    <p style="font-size:0.95rem; margin-top:5px; color:${p.hasAllergies ? 'red' : 'green'}">الحساسية: ${p.hasAllergies ? p.allergyTypes : 'لا توجد'}</p>
                </div>

                <div style="margin-bottom:20px;">
                    <h3 style="font-size:1.1rem; margin-bottom:10px; color:var(--secondary);"><i class="fa-solid fa-house-medical"></i> الخطة المنزلية</h3>
                    ${renderTasks(p.homeCarePlan, 'homeCarePlan')}
                </div>
                
                <div style="margin-bottom:20px;">
                    <h3 style="font-size:1.1rem; margin-bottom:10px; color:var(--secondary);"><i class="fa-solid fa-hospital"></i> خطة المستشفى</h3>
                    ${renderTasks(p.hospitalCarePlan, 'hospitalCarePlan')}
                </div>

                ${role === 'admin' ? `
                <div class="glass-card" style="padding:15px; margin-top:20px; background:rgba(2,132,199,0.05); border:1px dashed var(--primary);">
                    <h3 style="font-size:1.1rem; margin-bottom:10px;">إضافة تكليف جديد للمسار</h3>
                    <div class="form-row" style="align-items:flex-end;">
                        <div class="form-group" style="flex:1;"><label>المسار:</label><select id="add-path-type"><option value="homeCarePlan">رعاية منزلية</option><option value="hospitalCarePlan">مستشفى</option><option value="postCarePlan">متابعة ما بعد العلاج</option></select></div>
                        <div class="form-group" style="flex:1;"><label>التوقيت:</label><input type="text" id="add-path-time"></div>
                        <div class="form-group" style="flex:2;"><label>الوصف:</label><input type="text" id="add-path-task"></div>
                        <div class="form-group"><button class="btn btn-primary" onclick="addPatientPath('${p.id}')">إضافة</button></div>
                    </div>
                </div>` : ''}
            </div>
        `;
        openDynamicModal(html);
    };

    window.addPatientPath = (id) => {
        const p = DB.patients.find(x => x.id === id);
        if (!p) return;
        const type = document.getElementById('add-path-type').value;
        const time = document.getElementById('add-path-time').value;
        const task = document.getElementById('add-path-task').value;
        if (!time || !task) return;
        p[type].push({ id: 't_' + Date.now(), time, task, status: 'لم يكتمل بعد' });
        openUnifiedPatientModal(id, 'admin');
    };

    window.deleteTask = (pId, listType, taskId) => {
        const p = DB.patients.find(x => x.id === pId);
        if (!p) return;
        p[listType] = p[listType].filter(t => t.id !== taskId);
        openUnifiedPatientModal(pId, 'admin');
    };

    // Hospital Search Logic
    window.renderHospitalDashboard = (searchTerm = '') => {
        const hpContainer = document.getElementById('hospital-patients-render');
        if (hpContainer) {
            let pList = DB.patients.filter(p => p.hospId === 'hosp001');
            if (searchTerm) pList = pList.filter(p => p.name.includes(searchTerm) || p.id.includes(searchTerm));
            hpContainer.innerHTML = pList.length ? pList.map(p => `
                <div class="glass-card" style="padding:15px; margin-bottom:10px; cursor:pointer;" onclick="openUnifiedPatientModal('${p.id}', 'hospital')">
                    <h4 style="margin:0;">${p.name}</h4><p style="margin:5px 0 0; font-size:0.9rem; color:var(--text-muted);">عرض التفاصيل والمسارات</p>
                </div>
            `).join('') : '<p>لا توجد نتائج.</p>';
        }

        const devNotesContainer = document.getElementById('hospital-dev-notes-list');
        if (devNotesContainer) {
            const h = DB.hospitals.find(x => x.id === 'hosp001');
            devNotesContainer.innerHTML = (h && h.developerNotes.length) ? h.developerNotes.map(n => `<div class="note-item" style="background:rgba(234, 179, 8, 0.1); border-right:4px solid var(--warning); margin-bottom:15px;"><div style="font-weight:bold;"><i class="fa-solid fa-crown"></i> توجيه المطور:</div><div>${n}</div></div>`).join('') : '<p>لا توجد تعليمات</p>';
        }

        const bookingsList = document.getElementById('hospital-bookings-list');
        if (bookingsList) {
            if (!DB.bookings) DB.bookings = [];
            const pending = DB.bookings.filter(b => b.status === 'pending');
            bookingsList.innerHTML = pending.length ? pending.map(b => `
                <div class="glass-card" style="padding:15px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <h4>${b.patientName} <span class="badge" style="background:var(--warning);font-size:0.8rem;padding:2px 8px;border-radius:10px; color:#000;">${b.type}</span></h4>
                        <p style="margin:5px 0 0; font-size:0.9rem; color:var(--text-muted);">التخصص: ${b.specialty} | اليوم: ${b.date}</p>
                    </div>
                    <div>
                        <input type="time" id="time-${b.id}" style="padding:5px; border-radius:5px;">
                        <button class="btn btn-success" style="padding:5px 15px; border-radius:5px; font-size:0.9rem; border:none; background:#34d399; color:white; cursor:pointer;" onclick="approveBooking('${b.id}')"><i class="fa-solid fa-check"></i>تحديد وقت</button>
                    </div>
                </div>
            `).join('') : '<p>لا توجد طلبات حجز معلقة.</p>';
        }
    };

    window.approveBooking = (id) => {
        const timeVal = document.getElementById(`time-${id}`).value;
        if (!timeVal) return alert('الرجاء تحديد الساعة أولاً');

        const b = DB.bookings.find(x => x.id === id);
        if (b) {
            b.status = 'approved';
            b.time = timeVal;
            alert('تمت الموافقة وتم إرسال الساعة المتاحة للمريض');
            renderHospitalDashboard();

            if (b.freeUserId) {
                const free = DB.freeUsers.find(x => x.email === b.freeUserId);
                if (free) {
                    free.notifications.push({ id: 'N' + Date.now(), text: `مستشفى: تمت الموافقة على حجزك يوم ${b.date} الساعة ${b.time}. التخصص: ${b.specialty}` });
                }
            } else {
                const pat = DB.patients.find(p => p.name === b.patientName);
                if (pat) {
                    pat.adminNotes.unshift(`تم الموافقة على حجزك يوم ${b.date} الساعة ${b.time}. التخصص: ${b.specialty}`);
                }
            }
            localStorage.setItem('medtrack_DB', JSON.stringify(DB));
        }
    };

    // Admin Messaging
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
        if (type === 'doctor') { const d = DB.doctors.find(x => x.id === targetId); if (d) d.developerNotes.unshift(txt); }
        else if (type === 'hospital') { const h = DB.hospitals.find(x => x.id === targetId); if (h) h.developerNotes.unshift(txt); }
        else if (type === 'patient') { const p = DB.patients.find(x => x.id === targetId); if (p) p.adminNotes.unshift(txt); }
        alert('تم إرسال التعليم بنجاح!'); document.getElementById('admin-msg-text').value = '';
    };

    function showScreen(screen) {
        [initialAuthScreen, loginScreen, dashboardScreen, adminDashboardScreen, doctorDashboardScreen, hospitalDashboardScreen].forEach(s => { if (s) s.classList.remove('active'); });
        screen.classList.add('active');
        const activeTab = screen.querySelector('.tab-pane.active');
        if (activeTab) { activeTab.classList.remove('fade-in'); void activeTab.offsetWidth; activeTab.classList.add('fade-in'); }

        const testDataBox = document.getElementById('test-data-box');
        if (testDataBox) {
            if (screen === loginScreen) testDataBox.classList.remove('hidden');
            else testDataBox.classList.add('hidden');
        }
    }

    logoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLoginRole = null;
            loggedInUserId = null;
            showScreen(loginScreen); if (globalCornerMenu) globalCornerMenu.classList.remove('hidden');
            if (patientCodeInput) patientCodeInput.value = ''; if (modalSecretCode) modalSecretCode.value = '';
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
                targetPane.classList.add('active'); targetPane.classList.remove('fade-in'); void targetPane.offsetWidth; targetPane.classList.add('fade-in');
            }
            if (link.getAttribute('data-tab') === 'admin-messaging' && window.updateAdminMsgTargets) window.updateAdminMsgTargets();
        });
    });

    // Theme Toggler
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const savedTheme = localStorage.getItem('medtrack_theme');

    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('light-theme');
            if (document.documentElement.classList.contains('light-theme')) {
                localStorage.setItem('medtrack_theme', 'light');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            } else {
                localStorage.setItem('medtrack_theme', 'dark');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
            }
        });
    }

    window.addEventListener('beforeunload', () => {
        localStorage.setItem('medtrack_role', currentLoginRole || '');
        localStorage.setItem('medtrack_uid', loggedInUserId || '');
        localStorage.setItem('medtrack_DB', JSON.stringify(DB));
    });
});
