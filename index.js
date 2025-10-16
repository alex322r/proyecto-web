
    // Navegación: activar vista y título
    const menuItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');

    function setActiveMenu(targetId){
      menuItems.forEach(it=>it.classList.toggle('active', it.dataset.target===targetId));
      views.forEach(v=>v.classList.toggle('active', v.id===targetId));
      // update page title/subtitle
      const pageTitle = document.getElementById('pageTitle');
      const pageSubtitle = document.getElementById('pageSubtitle');
      const titleMap = {
        dashboard:'Dashboard',
        pacientes:'Pacientes',
        agenda:'Agenda',
        pagos:'Pagos / Caja',
        planes:'Planes y Seguros',
        empleados:'Empleados',
        reportes:'Reportes',
        config:'Configuración'
      };
      pageTitle.textContent = titleMap[targetId] || 'Pantalla';
      pageSubtitle.textContent = (targetId==='dashboard') ? 'Resumen general' : '';
      // scroll to top of content
      document.querySelector('.content').scrollTop = -1;
    }

    menuItems.forEach(it=>{
      it.addEventListener('click', ()=> setActiveMenu(it.dataset.target));
    });

    // shortcut function to navigate programmatically
    function goTo(id){ setActiveMenu(id); window.location.hash = id; }

    // On load: read hash
    window.addEventListener('load', ()=>{
      const h = window.location.hash.replace('#','');
      if(h) setActiveMenu(h);
    });

    // Mock actions
    function viewProfile(id){
      alert('Abrir perfil del paciente (id=' + id + ') – en el prototipo se muestra la misma interfaz.');
      goTo('pacientes');
    }

    function openNewPatient(){ alert('Abrir modal Nuevo Paciente — prototipo (no persistente).'); }
    function openNewAppointment(){ alert('Abrir modal Agendar Cita — prototipo.'); }
    function openPaymentModal(){ alert('Abrir modal Registrar Pago — prototipo.'); }
    function openNewPlan(){ alert('Abrir modal Nuevo Plan — prototipo.'); }
    function openNewEmployee(){ alert('Abrir modal Nuevo Empleado — prototipo.'); }

    // Extra: buscar paciente (filtro simple on client)
    document.getElementById('buscarPaciente').addEventListener('input', function(e){
      const q = e.target.value.toLowerCase().trim();
      const tbody = document.getElementById('patientsTable');
      Array.from(tbody.querySelectorAll('tr')).forEach(row=>{
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });