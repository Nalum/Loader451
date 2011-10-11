/**
 * This script is released under the GNU GPL. See the file COPYING.
 * The script is provided as is, with no guarantee either express or implied
 * that it is fit for purpose. Use of the script, is entirely at the end users risk.
 *
 * @category Plugin
 * @package  Loader451
 * @author   Luke Mallon <luke.mallon@nexus451.com>
 * @license  GNU GPL - http://www.gnu.org/licenses/gpl.txt
 * @link     https://github.com/nalum/Loader451
 * @version  0.1.0
 */

/**
 * Loader451
 * 
 * jQuery plugin to load/add/edit/delete the content of a webpage via ajax.
 * 
 * Min Required:
 *      jQuery Version 1.6
 * 
 * Example Usage:
 *      $.loader451({
 *          'actionClass'   : 'Action'
 *      });
 */

(function($){
    $.extend({
        'loader451' : function(options) {
            var defaults = {
                'actionClass'   : 'action',
                'actionPath'    : '/ajax/action/',
                'formClass'     : 'form',
                'formPath'      : '/ajax/form/',
                'sectionClass'  : 'section',
                'sectionPath'   : '/ajax/section/',
                'autoLoad'      : true,
                'modal'         : true,
                'validateForms' : true,
                'submitForms'   : true,
                'activeIcon'    : 'loader.gif'
            };
            var settings = $.extend({}, defaults, options);
            
            $('body').delegate('.' + settings.sectionClass, 'click', function(e){
                e.preventDefault();
                var $section = $(this);
            });
            
            $('body').delegate('.' + settings.formClass, 'click', function(e){
                e.preventDefault();
                var $form = $(this);
            });
            
            $('body').delegate('.' + settings.actionClass, 'click', function(e){
                e.preventDefault();
                var $action = $(this);
            });
            
            if (settings.validateForms || settings.submitForms) {
                $('body').delegate('form', 'submit', function(e){
                    var $form = $(this), valid = true;
                    
                    if (settings.submitForms) {
                        e.preventDefault();
                    }
                    
                    if (settings.validateForms) {
                        valid = false;
                        $form.find('.required').each(function(i, o){
                            var $o = $(o);
                            
                            if ($o.val()) {
                                valid = false;
                            }
                        });
                    }
                    
                    if (!valid) {
                        e.preventDefault();
                    }
                    
                    if (settings.submitForms && valid) {
                        $.ajax({
                            'method'    : 'post'
                        });
                    }
                });
            }
        }
    });
})(jQuery);
