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
 *      jQuery Version 1.7
 *
 * Example Usage:
 *      $.loader451({
 *          'actionClass'   : 'Action'
 *      });
 */

(function ($) {
    "use strict";

    $.extend({
        "loader451" : function (options) {
            var defaults = {
                "actionClass"   : "action",
                "actionPath"    : "/ajax/action/",
                "formClass"     : "form",
                "formPath"      : "/ajax/form/",
                "sectionClass"  : "section",
                "sectionPath"   : "/ajax/section/",
                "autoLoad"      : true,
                "modal"         : true,
                "validateForms" : true,
                "submitForms"   : true,
                "activeIcon"    : "loader.gif",
                "requireFields" : ".required",
                "validEmail"    : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
            }, settings = $.extend({}, defaults, options);

            $('body').on('click', '.' + settings.sectionClass, function (event) {
                event.preventDefault();
                var $section = $(this);
            });

            $('body').on('click', '.' + settings.actionClass, function (event) {
                event.preventDefault();
                var $action = $(this);
            });

            if (settings.validateForms || settings.submitForms) {
                $('body').on('submit', 'form.' + settings.formClass, function (event) {
                    var $form = $(this), valid = true;

                    if (settings.submitForms) {
                        event.preventDefault();
                    }

                    if (settings.validateForms) {
                        $form.find(settings.requiredFields).each(function (index, object) {
                            var $object = $(object);

                            if ($object.val()) {
                                valid = false;
                            }
                        });
                    }

                    if (!valid) {
                        event.preventDefault();
                    }

                    if (settings.submitForms && valid) {
                        $.ajax({
                            "method"    : "post",
                            "action"    : settings.formPath + $form.attr('action'),
                            "complete"  : function (jqXHR, textStatus) {
                                console.log(textStatus);

                                if (typeof $.loader451.complete[$form.attr('id')] === "function") {
                                    $.loader451.complete[$form.attr('id')]();
                                }
                            },
                            "error"     : function (jqXHR, textStats, errorThrown) {
                                console.log(textStatus);
                                console.log(errorThrown);

                                if (typeof $.loader451.error[$form.attr('id')] === "function") {
                                    $.loader451.error[$form.attr('id')]();
                                }
                            },
                            "success"   : function (data, textStatus, jqXHR) {
                                console.log(data);
                                console.log(textStatus);

                                if (typeof $.loader451.success[$form.attr('id')] === "function") {
                                    $.loader451.success[$form.attr('id')]();
                                }
                            }
                        });
                    }
                });
            }

            return this;
        }
    });

    $.extend($.loader451, {
        "complete"  : {},
        "error"     : {},
        "success"   : {},
        "add"       : function (type, name, method) {
            $.loader451[type][name] = method;
        }
    });
})(jQuery);