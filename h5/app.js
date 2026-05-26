document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tabs .tab-item');
    const tabBarItems = document.querySelectorAll('.tab-bar .tab-item');
    const backBtns = document.querySelectorAll('.back-btn');
    const postCards = document.querySelectorAll('.post-card');
    const actionItems = document.querySelectorAll('.action-item');
    const commentLikes = document.querySelectorAll('.comment-like');
    const followBtn = document.querySelector('.follow-btn');
    const contentInput = document.querySelector('.content-input');
    const charCount = document.querySelector('.char-count');
    const commentInput = document.querySelector('.comment-input');
    const sendBtn = document.querySelector('.send-btn');
    const profileCard = document.querySelector('.profile-card');

    function switchPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.querySelectorAll('.tab-bar .tab-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const targetPage = document.getElementById('page-' + pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        const targetTab = document.querySelector('.tab-bar .tab-item[data-page="' + pageId + '"]');
        if (targetTab) {
            targetTab.classList.add('active');
        }
        
        window.scrollTo(0, 0);
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    tabBarItems.forEach(item => {
        item.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                switchPage(pageId);
            }
        });
    });

    backBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                switchPage(pageId);
            }
        });
    });

    postCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.action-item') && !e.target.closest('.more-btn')) {
                switchPage('detail');
            }
        });
    });

    actionItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.getAttribute('data-action');
            const icon = this.querySelector('.action-icon');
            const text = this.querySelector('.action-text');
            
            if (action === 'like') {
                if (icon.textContent === '🤍') {
                    icon.textContent = '❤️';
                    text.textContent = parseInt(text.textContent) + 1;
                } else {
                    icon.textContent = '🤍';
                    text.textContent = parseInt(text.textContent) - 1;
                }
            } else if (action === 'favorite') {
                if (icon.textContent === '☆') {
                    icon.textContent = '⭐';
                    text.textContent = parseInt(text.textContent) + 1;
                } else {
                    icon.textContent = '☆';
                    text.textContent = parseInt(text.textContent) - 1;
                }
            }
        });
    });

    commentLikes.forEach(like => {
        like.addEventListener('click', function() {
            if (this.textContent.includes('🤍')) {
                this.textContent = this.textContent.replace('🤍', '❤️');
                const parts = this.textContent.split(' ');
                parts[1] = parseInt(parts[1]) + 1;
                this.textContent = parts.join(' ');
            } else {
                this.textContent = this.textContent.replace('❤️', '🤍');
                const parts = this.textContent.split(' ');
                parts[1] = parseInt(parts[1]) - 1;
                this.textContent = parts.join(' ');
            }
        });
    });

    if (followBtn) {
        followBtn.addEventListener('click', function() {
            if (this.textContent === '关注') {
                this.textContent = '已关注';
                this.style.background = '#C4A77D';
                this.style.color = '#fff';
                this.style.borderColor = '#C4A77D';
            } else {
                this.textContent = '关注';
                this.style.background = 'transparent';
                this.style.color = '#C4A77D';
                this.style.borderColor = '#C4A77D';
            }
        });
    }

    if (contentInput && charCount) {
        contentInput.addEventListener('input', function() {
            charCount.textContent = this.value.length + '/1000';
        });
    }

    if (commentInput && sendBtn) {
        sendBtn.addEventListener('click', function() {
            if (commentInput.value.trim()) {
                alert('评论发送成功！');
                commentInput.value = '';
            }
        });
    }

    if (profileCard) {
        profileCard.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                switchPage(pageId);
            }
        });
    }
});