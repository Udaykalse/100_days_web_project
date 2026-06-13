class ModernTooltipManager {
    constructor() {
        this.tooltipElement = document.getElementById('liveTooltip');
        this.activeTrigger = null;
        this.hideTimeout = null;
        this.showTimeout = null;
        this.delay = 80;
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.setupDynamicControls();
        this.observePositionChanges();
    }

    attachEventListeners() {
        const triggers = document.querySelectorAll('.tooltip-trigger, .dynamic-btn');
        
        triggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', (e) => this.handleMouseEnter(e.currentTarget));
            trigger.addEventListener('mouseleave', () => this.handleMouseLeave());
            trigger.addEventListener('focus', (e) => this.handleFocus(e.currentTarget));
            trigger.addEventListener('blur', () => this.handleBlur());
            
            if (trigger.classList.contains('dynamic-btn')) {
                const parentCard = trigger.closest('.dynamic-area');
                if (parentCard) {
                    const tooltipText = trigger.getAttribute('data-custom-tooltip');
                    if (tooltipText) {
                        trigger.setAttribute('data-tooltip', tooltipText);
                    }
                }
            } else {
                const card = trigger.closest('.tooltip-card');
                if (card) {
                    const tooltipContent = card.getAttribute('data-tooltip');
                    const position = card.getAttribute('data-position');
                    if (tooltipContent) {
                        trigger.setAttribute('data-tooltip', tooltipContent);
                    }
                    if (position) {
                        trigger.setAttribute('data-position', position);
                    }
                }
            }
        });
    }

    setupDynamicControls() {
        const dynamicBtn = document.getElementById('dynamicBtn');
        const textInput = document.getElementById('tooltipText');
        const positionSelect = document.getElementById('positionSelect');
        const delaySlider = document.getElementById('delayRange');
        const delayValueSpan = document.getElementById('delayValue');

        if (dynamicBtn && textInput) {
            textInput.addEventListener('input', (e) => {
                const newText = e.target.value.trim() || 'custom tip';
                dynamicBtn.setAttribute('data-custom-tooltip', newText);
                dynamicBtn.setAttribute('data-tooltip', newText);
                if (this.activeTrigger === dynamicBtn && this.tooltipElement.classList.contains('show')) {
                    this.updateTooltipContent(dynamicBtn);
                    const rect = dynamicBtn.getBoundingClientRect();
                    const position = dynamicBtn.getAttribute('data-position') || 'bottom';
                    this.positionTooltip(rect, position);
                }
            });
        }

        if (positionSelect && dynamicBtn) {
            positionSelect.addEventListener('change', (e) => {
                const newPosition = e.target.value;
                dynamicBtn.setAttribute('data-position', newPosition);
                if (this.activeTrigger === dynamicBtn && this.tooltipElement.classList.contains('show')) {
                    const rect = dynamicBtn.getBoundingClientRect();
                    this.positionTooltip(rect, newPosition);
                }
            });
        }

        if (delaySlider && delayValueSpan) {
            delaySlider.addEventListener('input', (e) => {
                this.delay = parseInt(e.target.value, 10);
                delayValueSpan.textContent = `${this.delay}ms`;
            });
        }
    }

    observePositionChanges() {
        const resizeObserver = new ResizeObserver(() => {
            if (this.activeTrigger && this.tooltipElement.classList.contains('show')) {
                const rect = this.activeTrigger.getBoundingClientRect();
                const position = this.activeTrigger.getAttribute('data-position') || 'bottom';
                this.positionTooltip(rect, position);
            }
        });
        
        const triggers = document.querySelectorAll('.tooltip-trigger, .dynamic-btn');
        triggers.forEach(trigger => resizeObserver.observe(trigger));
        
        window.addEventListener('scroll', () => {
            if (this.activeTrigger && this.tooltipElement.classList.contains('show')) {
                const rect = this.activeTrigger.getBoundingClientRect();
                const position = this.activeTrigger.getAttribute('data-position') || 'bottom';
                this.positionTooltip(rect, position);
            }
        }, { passive: true });
        
        window.addEventListener('resize', () => {
            if (this.activeTrigger && this.tooltipElement.classList.contains('show')) {
                const rect = this.activeTrigger.getBoundingClientRect();
                const position = this.activeTrigger.getAttribute('data-position') || 'bottom';
                this.positionTooltip(rect, position);
            }
        });
    }

    handleMouseEnter(trigger) {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
        }
        this.showTimeout = setTimeout(() => {
            this.showTooltip(trigger);
        }, this.delay);
    }

    handleMouseLeave() {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
        this.hideTimeout = setTimeout(() => {
            this.hideTooltip();
        }, 50);
    }

    handleFocus(trigger) {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
        this.showTooltip(trigger);
    }

    handleBlur() {
        this.hideTooltip();
    }

    showTooltip(trigger) {
        if (this.activeTrigger === trigger && this.tooltipElement.classList.contains('show')) {
            return;
        }
        this.hideTooltip(true);
        this.activeTrigger = trigger;
        this.updateTooltipContent(trigger);
        const rect = trigger.getBoundingClientRect();
        let position = trigger.getAttribute('data-position');
        if (!position) {
            position = trigger.closest('.tooltip-card')?.getAttribute('data-position') || 'bottom';
        }
        this.positionTooltip(rect, position);
        this.tooltipElement.classList.add('show');
        this.tooltipElement.setAttribute('aria-hidden', 'false');
    }

    updateTooltipContent(trigger) {
        let tooltipText = trigger.getAttribute('data-tooltip');
        if (!tooltipText) {
            tooltipText = trigger.getAttribute('data-custom-tooltip');
        }
        if (!tooltipText && trigger.classList.contains('top-trigger')) tooltipText = 'Top tooltip — appears above';
        if (!tooltipText && trigger.classList.contains('right-trigger')) tooltipText = 'Right tooltip — slides from side';
        if (!tooltipText && trigger.classList.contains('bottom-trigger')) tooltipText = 'Bottom tooltip — smooth upward';
        if (!tooltipText && trigger.classList.contains('left-trigger')) tooltipText = 'Left tooltip — perfect for sidebars';
        if (!tooltipText) tooltipText = 'Interactive tooltip';
        
        this.tooltipElement.textContent = tooltipText;
    }

    positionTooltip(rect, position) {
        const tooltip = this.tooltipElement;
        const tooltipRect = tooltip.getBoundingClientRect();
        const spacing = 12;
        let top, left;
        let arrowDir = position;
        
        const viewportPadding = 10;
        let finalTop, finalLeft;
        
        switch(position) {
            case 'top':
                top = rect.top - tooltipRect.height - spacing;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                if (top < viewportPadding) {
                    top = rect.bottom + spacing;
                    arrowDir = 'bottom';
                } else {
                    arrowDir = 'top';
                }
                break;
            case 'bottom':
                top = rect.bottom + spacing;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                if (top + tooltipRect.height > window.innerHeight - viewportPadding) {
                    top = rect.top - tooltipRect.height - spacing;
                    arrowDir = 'top';
                } else {
                    arrowDir = 'bottom';
                }
                break;
            case 'left':
                left = rect.left - tooltipRect.width - spacing;
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                if (left < viewportPadding) {
                    left = rect.right + spacing;
                    arrowDir = 'right';
                } else {
                    arrowDir = 'left';
                }
                break;
            case 'right':
                left = rect.right + spacing;
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                if (left + tooltipRect.width > window.innerWidth - viewportPadding) {
                    left = rect.left - tooltipRect.width - spacing;
                    arrowDir = 'left';
                } else {
                    arrowDir = 'right';
                }
                break;
            default:
                top = rect.bottom + spacing;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                arrowDir = 'bottom';
        }
        
        finalLeft = Math.max(viewportPadding, Math.min(left, window.innerWidth - tooltipRect.width - viewportPadding));
        finalTop = Math.max(viewportPadding, Math.min(top, window.innerHeight - tooltipRect.height - viewportPadding));
        
        tooltip.style.top = `${finalTop}px`;
        tooltip.style.left = `${finalLeft}px`;
        tooltip.setAttribute('data-arrow', arrowDir);
        
        if (finalLeft !== left) {
            const microAdjust = finalLeft - left;
            const newArrowDir = arrowDir;
            tooltip.setAttribute('data-arrow', newArrowDir);
        }
    }

    hideTooltip(immediate = false) {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
        if (!immediate && this.hideTimeout) return;
        this.tooltipElement.classList.remove('show');
        this.tooltipElement.setAttribute('aria-hidden', 'true');
        this.activeTrigger = null;
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.tooltipManager = new ModernTooltipManager();
    
    const style = document.createElement('style');
    style.textContent = `
        .modern-tooltip[data-arrow="top"]::before { bottom: -6px; left: 50%; transform: translateX(-50%) rotate(45deg); border-bottom: 1px solid rgba(255,255,255,0.2); border-right: 1px solid rgba(255,255,255,0.2); top: auto; }
        .modern-tooltip[data-arrow="bottom"]::before { top: -6px; left: 50%; transform: translateX(-50%) rotate(45deg); border-top: 1px solid rgba(255,255,255,0.2); border-left: 1px solid rgba(255,255,255,0.2); bottom: auto; }
        .modern-tooltip[data-arrow="left"]::before { right: -6px; top: 50%; transform: translateY(-50%) rotate(45deg); border-top: 1px solid rgba(255,255,255,0.2); border-right: 1px solid rgba(255,255,255,0.2); left: auto; }
        .modern-tooltip[data-arrow="right"]::before { left: -6px; top: 50%; transform: translateY(-50%) rotate(45deg); border-bottom: 1px solid rgba(255,255,255,0.2); border-left: 1px solid rgba(255,255,255,0.2); right: auto; }
    `;
    document.head.appendChild(style);
});